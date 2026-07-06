const mongoose = require('mongoose');
const Job = mongoose.model('Job');
const Page = mongoose.model('Page');
const Bubble = mongoose.model('Bubble');
const ocrService = require('./ocrService');

// Simpan active timeouts agar bisa di-cleanup
const activeJobs = new Map();

const processJob = async (jobId) => {
  const job = await Job.findById(jobId);
  if (!job) return;

  job.status = 'running';
  await job.save();

  try {
    if (job.type === 'ocr') {
      const pageId = job.metadata.pageId;
      const page = await Page.findById(pageId);
      if (page) {
        // Jalankan deteksi teks nyata menggunakan Tesseract
        // Path gambar relatif /uploads/page-...
        // Kita ubah ke path lokal di server api
        const relativeImagePath = page.image.replace(/^\//, ''); // hapus leading slash
        
        job.progress = 20;
        await job.save();

        const detectedBubbles = await ocrService.detectText(relativeImagePath);
        
        job.progress = 60;
        await job.save();

        // Hapus bubble lama
        await Bubble.deleteMany({ page: pageId });
        page.bubbles = [];

        // Simpan hasil OCR nyata ke database MongoDB
        for (const detected of detectedBubbles) {
          const bubble = await Bubble.create({
            page: pageId,
            originalText: detected.text,
            translatedText: '', // Kosongkan dulu untuk diterjemahkan nanti
            x: detected.x,
            y: detected.y,
            width: detected.width,
            height: detected.height,
            status: 'ocr',
            confidence: 96
          });
          page.bubbles.push(bubble._id);
        }

        page.status = 'ocr';
        await page.save();
      }
    } else if (job.type === 'translation') {
      await mockTranslationSideEffect(job.metadata.pageId);
    }

    job.progress = 100;
    job.status = 'completed';
    job.completedAt = new Date();
    await job.save();

  } catch (err) {
    console.error(`Error processing job ${jobId}:`, err);
    await Job.findByIdAndUpdate(jobId, { status: 'failed', message: err.message });
  }
};

const mockTranslationSideEffect = async (pageId) => {
  if (!pageId) return;
  const bubbles = await Bubble.find({ page: pageId });
  
  // Karena teks aslinya sekarang dinamis berbahasa Inggris (hasil OCR),
  // kita buat translator simulasi yang menerjemahkan teks Inggris ke Indonesia
  // Jika teks tidak terdaftar, kita buat mock translation sederhana
  for (const bubble of bubbles) {
    let translation = 'Terjemahan bahasa Indonesia';
    const textLower = bubble.originalText.toLowerCase();
    
    if (textLower.includes('wait')) {
      translation = 'Tunggu aku!';
    } else if (textLower.includes('destroy') || textLower.includes('kill')) {
      translation = 'Aku akan menghancurkan mereka!';
    } else {
      translation = `[ID] ${bubble.originalText}`;
    }

    bubble.translatedText = translation;
    bubble.status = 'translated';
    await bubble.save();
  }

  await Page.findByIdAndUpdate(pageId, { status: 'translated' });
};

module.exports = {
  enqueue: (jobId) => {
    processJob(jobId).catch((err) => console.error('Failed to start job:', err));
  }
};
