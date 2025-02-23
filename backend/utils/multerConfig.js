const multer = require('multer');

// ✅ Chỉ cần dùng `memoryStorage()`
const multerStorage = multer.memoryStorage();

// ✅ Check file có phải là ảnh không
const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new Error('Not an image! Please upload images'), false);
  }
};

const upload = multer({
  storage: multerStorage, // ✅ Không có destination
  fileFilter: multerFilter,
});

exports.uploadCoursePhoto = upload.single('cover_photo');
