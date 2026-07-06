const mongoose = require('mongoose');
const Bubble = mongoose.model('Bubble');
const Page = mongoose.model('Page');

exports.list = async (req, res, next) => {
  try {
    const bubbles = await Bubble.find({ page: req.params.pageId }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: bubbles });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { pageId } = req.params;
    const { originalText, translatedText, x, y, width, height } = req.body;
    const page = await Page.findById(pageId);
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    const bubble = await Bubble.create({ page: pageId, originalText, translatedText, x, y, width, height });
    page.bubbles.push(bubble._id);
    await page.save();
    res.status(201).json({ success: true, message: 'Bubble created', data: bubble });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { translatedText, originalText, x, y, width, height, status, font, fontSize, confidence } = req.body;
    const bubble = await Bubble.findByIdAndUpdate(
      req.params.id,
      { $set: { translatedText, originalText, x, y, width, height, status, font, fontSize, confidence } },
      { new: true, runValidators: true }
    );
    if (!bubble) return res.status(404).json({ success: false, message: 'Bubble not found' });
    res.status(200).json({ success: true, message: 'Bubble updated', data: bubble });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const bubble = await Bubble.findByIdAndDelete(req.params.id);
    if (!bubble) return res.status(404).json({ success: false, message: 'Bubble not found' });
    await Page.findByIdAndUpdate(bubble.page, { $pull: { bubbles: bubble._id } });
    res.status(200).json({ success: true, message: 'Bubble deleted' });
  } catch (err) { next(err); }
};
