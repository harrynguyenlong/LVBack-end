const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const imageUpload = (type = 'image') =>
    multer({
        limits: 500000, // 500kb
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                if (type === 'avatar') {
                    cb(null, 'uploads/avatars');
                } else {
                    cb(null, 'uploads/images');
                }
            },
            filename: (req, file, cb) => {
                const filename = `${req.userId}-${new Date().getTime()}`;
                const ext = MIME_TYPE_MAP[file.mimetype];
                cb(null, filename + '.' + ext);
            },
        }),
        fileFilter: (req, file, cb) => {
            const isValid = !!MIME_TYPE_MAP[file.mimetype];
            let error = isValid ? null : new Error('Invalid mime type');
            cb(error, isValid);
        },
    });

module.exports = imageUpload;
