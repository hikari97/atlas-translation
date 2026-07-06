const mongoose = require('mongoose');
const Job = mongoose.model('Job');
const Page = mongoose.model('Page');
const jobQueue = require('../services/jobQueue');

exports.triggerOcr = async (req, res, next) => {
  try {
    const { pageId } = req.body;
    if (!pageId) {
      return res.status(400).json({ success: false, message: 'pageId is required' });
    }

    const page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }

    const job = await Job.create({
      type: 'ocr',
      user: req.user.id,
      metadata: { pageId }
    });

    jobQueue.enqueue(job._id);

    res.status(202).json({
      success: true,
      message: 'OCR job queued successfully',
      data: { jobId: job._id }
    });
  } catch (err) { next(err); }
};

exports.triggerTranslation = async (req, res, next) => {
  try {
    const { pageId, targetLanguage } = req.body;
    if (!pageId) {
      return res.status(400).json({ success: false, message: 'pageId is required' });
    }

    const page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }

    const job = await Job.create({
      type: 'translation',
      user: req.user.id,
      metadata: { pageId, targetLanguage: targetLanguage || 'en' }
    });

    jobQueue.enqueue(job._id);

    res.status(202).json({
      success: true,
      message: 'Translation job queued successfully',
      data: { jobId: job._id }
    });
  } catch (err) { next(err); }
};

exports.status = async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.jobId, user: req.user.id });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({
      success: true,
      data: {
        id: job._id,
        type: job.type,
        status: job.status,
        progress: job.progress,
        message: job.message,
        metadata: job.metadata,
        completedAt: job.completedAt
      }
    });
  } catch (err) { next(err); }
};
