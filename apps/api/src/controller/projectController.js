const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Page = mongoose.model('Page');

exports.list = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = { user: req.user.id };
    if (status) filter.status = status;
    if (search) filter.name = { $regex: search, $options: 'i' };
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (err) { next(err); }
};

exports.detail = async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user.id }).populate('pages');
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, description, sourceLanguage, targetLanguage } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Project name is required' });
    const project = await Project.create({ name, description, sourceLanguage, targetLanguage, user: req.user.id });
    res.status(201).json({ success: true, message: 'Project created', data: project });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { name, description, status, sourceLanguage, targetLanguage } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: { name, description, status, sourceLanguage, targetLanguage } },
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, message: 'Project updated', data: project });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    await Page.deleteMany({ project: project._id });
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (err) { next(err); }
};
