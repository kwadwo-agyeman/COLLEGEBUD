const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const allowedTypes = ['.png', '.jpeg', '.jpg'];
        const maxFileSize = 5 * 1024 * 1024;
        //Check file extension
        const fileType = allowedTypes.some(ext => file.originalname.endsWith(ext))
        if (!fileType) {
            return callback(new Error('Invalid file type. Only PNG, JPEG, and JPG files are allowed.'));
        }
        // Check file size
        if (file.size > maxFileSize) {
            return callback(new Error('File size exceeds the maximum limit (5MB).'));
        }

        callback(null, true);
    }

});

module.exports = {upload};
