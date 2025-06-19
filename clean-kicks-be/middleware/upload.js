import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Buat folder uploads jika belum ada
const uploadPath = 'uploads/';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext.toLowerCase())) {
            return cb(new Error("Only images are allowed"), false);
        }
        cb(null, true);
    }
});

export default upload;
