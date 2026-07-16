const multer = require('multer');

const {
  imageFileFilter,
  MAX_IMAGE_FILE_SIZE,
} = require('./imageUploadRules');

module.exports = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_FILE_SIZE },
  fileFilter: imageFileFilter,
});
