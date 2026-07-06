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
  await job.save();

  try {
    const pageId = job.metadata.pageId;
    const page = await Page.findById(pageId);
    if (!page || !page.image) {
      throw new Error(`Page or page image not found for pageId: ${pageId}`);
    }

    // Bangun URL gambar yang bisa diakses oleh AI Worker
    // Asumsi API server berjalan di port 3001
    const host = process.env.API_HOST || 'http://localhost:3001';
    const fullImageUrl = `${host}${page.image}`;

    console.log(`[JobQueue] Calling AI Worker for job ${job._id} with image URL: ${fullImageUrl}`);

    job.progress = 30;
    await job.save();

    // Panggil AI Worker API
    const aiResponse = await axios.post(`${AI_WORKER_URL}/v1/image/translate`, {
      imageUrl: fullImageUrl,
      targetLanguage: job.metadata.targetLanguage || 'id',
      provider: 'gemini' // Bisa dibuat dinamis nanti
    });

    if (!aiResponse.data || !aiResponse.data.success) {
      throw new Error(`AI Worker failed: ${aiResponse.data.detail || 'Unknown error'}`);
    }

    job.progress = 70;
    await job.save();

    const result = aiResponse.data;

    // Hapus bubble lama dan simpan hasil dari AI Worker
    await Bubble.deleteMany({ page: pageId });
    page.bubbles = [];

    for (const b of result.bubbles) {
      const bubble = await Bubble.create({
        page: pageId,
        originalText: b.original_text,
        translatedText: b.translated_text,
        x: b.box[0],
        y: b.box[1],
        width: b.box[2] - b.box[0],
        height: b.box[3] - b.box[1],
        status: 'translated',
        confidence: b.confidence || 95
      });
      page.bubbles.push(bubble._id);
    }
    
    page.status = 'translated';
    await page.save();

    job.progress = 100;
    job.status = 'completed';
    job.completedAt = new Date();
    await job.save();

    console.log(`[JobQueue] Job ${job._id} completed successfully.`);

  } catch (err) {
    console.error(`Error processing job ${jobId}:`, err);
    await Job.findByIdAndUpdate(jobId, { status: 'failed', message: err.message || 'AI Worker processing failed' });
  }
};

module.exports = {
  enqueue: (jobId) => {
    // Jalankan secara asynchronous tanpa memblokir thread HTTP
    processJob(jobId).catch((err) => console.error('Failed to start job:', err));
  }
};
