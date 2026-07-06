const mongoose = require('mongoose');
const Page = mongoose.model('Page');
const Project = mongoose.model('Project');
const Bubble = mongoose.model('Bubble');

exports.list = async (req, res, next) => {
  try {
    const pages = await Page.find({ project: req.params.projectId }).populate('bubbles').sort({ pageNumber: 1 });
    res.status(200).json({ success: true, data: pages });
  } catch (err) { next(err); }
};

exports.detail = async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id).populate('bubbles');
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    res.status(200).json({ success: true, data: page });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findOne({ _id: projectId, user: req.user.id });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    // Cek files
    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one image file is required' });
    }

    let count = await Page.countDocuments({ project: projectId });
    const createdPages = [];

    // Loop dan simpan masing-masing berkas gambar secara berurutan
    for (const file of files) {
      count++;
      const imageUrl = `/uploads/${file.filename}`;
      const page = await Page.create({
        project: projectId,
        pageNumber: count,
        image: imageUrl
      });
      project.pages.push(page._id);
      createdPages.push(page);
    }

    await project.save();

    res.status(201).json({ 
      success: true, 
      message: `${createdPages.length} pages created successfully`, 
      data: createdPages 
    });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { status, pageNumber } = req.body;
    const page = await Page.findByIdAndUpdate(req.params.id, { $set: { status, pageNumber } }, { new: true, runValidators: true });
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    res.status(200).json({ success: true, message: 'Page updated', data: page });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    await Bubble.deleteMany({ page: page._id });
    await Project.findByIdAndUpdate(page.project, { $pull: { pages: page._id } });
    res.status(200).json({ success: true, message: 'Page deleted' });
  } catch (err) { next(err); }
};
