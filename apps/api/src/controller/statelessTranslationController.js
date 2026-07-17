const { translateImageBuffer } = require('../services/aiWorkerClient');

exports.translateImage = async (req, res, next) => {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({
        success: false,
        message: 'An image file is required.',
      });
    }

    const result = await translateImageBuffer({
      buffer: req.file.buffer,
      context: req.body.context || '',
      filename: req.file.originalname,
      model: req.body.model || 'google/gemini-3.1-flash-lite-image',
      mimeType: req.file.mimetype,
      provider: req.body.provider || 'openrouter',
      sourceLanguage: req.body.sourceLanguage || undefined,
      targetLanguage: req.body.targetLanguage || 'id',
    });

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
