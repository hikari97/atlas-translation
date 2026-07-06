const mongoose = require('mongoose');

const bubbleSchema = new mongoose.Schema(
  {
    page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
    originalText: { type: String, default: '' },
    translatedText: { type: String, default: '' },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 50 },
    status: { type: String, enum: ['pending', 'ocr', 'translated', 'review', 'approved'], default: 'pending' },
    confidence: { type: Number, default: 0 },
    font: { type: String, default: 'Manga Standard' },
    fontSize: { type: Number, default: 16 },
  },
  { timestamps: true }
);

bubbleSchema.index({ page: 1, status: 1 });

module.exports = mongoose.models.Bubble || mongoose.model('Bubble', bubbleSchema);
