const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    pageNumber: { type: Number, required: true, default: 1 },
    image: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
    status: { type: String, enum: ['pending', 'ocr', 'translated', 'typesetting', 'completed'], default: 'pending' },
    bubbles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bubble' }],
  },
  { timestamps: true }
);

pageSchema.index({ project: 1, pageNumber: 1 });
pageSchema.index({ status: 1 });

module.exports = mongoose.models.Page || mongoose.model('Page', pageSchema);
