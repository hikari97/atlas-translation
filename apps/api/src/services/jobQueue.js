const mongoose = require('mongoose');
const axios = require('axios');
const Job = mongoose.model('Job');
const Page = mongoose.model('Page');
const Bubble = mongoose.model('Bubble');

const AI_WORKER_URL = process.env.AI_WORKER_URL || 'http://localhost:8000';

const processJob = async (jobId) => {
  const job = await Job.findById(jobId);
  if (!job) return;

  job.status = 'running';
  job.progress = 10;
  job.message = 'Job started';
  await job.save();

  try {
    const pageId = job.metadata.pageId;
    const page = await Page.findById(pageId);
    if (!page || !page.image) throw new Error('Page not found');

    const host = process.env.API_HOST || 'http://localhost:3001';
    const fullImageUrl = `${host}${page.image}`;

    job.progress = 30;
    job.message = 'Calling AI Worker service...';
    await job.save();

    console.log(`[JobQueue] Forwarding image to AI Worker: ${fullImageUrl}`);

    // Panggil AI Worker Python (FastAPI) di port 8000
    const aiResponse = await axios.post(`${AI_WORKER_URL}/v1/image/translate`, {
      imageUrl: fullImageUrl,
      targetLanguage: job.metadata.targetLanguage || 'id',
    });

    const result = aiResponse.data;
    console.log('result ', result);
    if (!result || !result.success) {
      throw new Error(result?.detail || 'AI Worker failed to process image');
    }

    job.progress = 70;
    job.message = 'Saving translation results...';
    await job.save();

    // Hapus bubble lama, simpan hasil baru dari AI Worker
    await Bubble.deleteMany({ page: pageId });
    page.bubbles = [];

    for (const b of result.bubbles || []) {
      const bubble = await Bubble.create({
        page: pageId,
        originalText: b.originalText || '',
        translatedText: b.translatedText || '',
        x: b.x || 0,
        y: b.y || 0,
        width: b.width || 0,
        height: b.height || 0,
        status: b.originalText ? 'translated' : 'ocr',
        confidence: b.confidence || 90,
        box: b.box || [],
      });
      page.bubbles.push(bubble._id);
    }

    page.status = 'translated';
    await page.save();

    job.progress = 100;
    job.status = 'completed';
    job.completedAt = new Date();
    job.message = 'Process complete!';
    await job.save();

    console.log(`[JobQueue] Job ${jobId} completed successfully.`);
  } catch (err) {
    console.error(`[JobQueue] Job ${jobId} failed:`, err);
    await Job.findByIdAndUpdate(jobId, {
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = {
  enqueue: (jobId) => {
    processJob(jobId).catch((e) => console.error(e));
  },
};
