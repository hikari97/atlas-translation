const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['draft', 'active', 'completed', 'archived'], default: 'draft' },
    sourceLanguage: { type: String, default: 'ja' },
    targetLanguage: { type: String, default: 'en' },
    pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
    coverImage: { type: String },
  },
  { timestamps: true }
);

projectSchema.index({ user: 1, createdAt: -1 });
projectSchema.index({ name: 'text' });

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
