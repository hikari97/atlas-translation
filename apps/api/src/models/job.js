const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    type: { 
      type: String, 
      enum: ['ocr', 'translation', 'inpaint', 'render', 'export'], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'running', 'completed', 'failed'], 
      default: 'pending' 
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    message: { type: String, default: '' },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

jobSchema.index({ user: 1, status: 1 });

module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);
