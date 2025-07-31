import multer from 'multer';
import path from 'path';

// Set allowed file types
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.csv' && ext !== '.xlsx' && ext !== '.xls') {
    return cb(new Error('Only CSV, XLSX, and XLS files are allowed'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export default upload;
