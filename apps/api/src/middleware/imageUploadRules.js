const path = require('path');

const MAX_IMAGE_FILE_SIZE = 20 * 1024 * 1024;
const SUPPORTED_IMAGE_EXTENSIONS = new Set(['.jpeg', '.jpg', '.png', '.webp']);
const SUPPORTED_IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

const imageFileFilter = (req, file, callback) => {
  const extension = path.extname(file.originalname || '').toLowerCase();
  const isSupported = SUPPORTED_IMAGE_EXTENSIONS.has(extension)
    && SUPPORTED_IMAGE_MIME_TYPES.has(file.mimetype);

  if (isSupported) {
    callback(null, true);
    return;
  }

  callback(new Error('Only JPEG, PNG, and WEBP images are allowed.'));
};

module.exports = {
  imageFileFilter,
  MAX_IMAGE_FILE_SIZE,
};
