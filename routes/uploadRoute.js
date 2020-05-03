const express = require('express');
const imageUpload = require('../middlewares/imageUpload');

const router = express.Router();

router.post('/image', imageUpload('image').single('image'), (req, res, next) => {
    // console.log('image upload', req.file.path);

    if (req.file.path) {
        res.status(200).json({
            status: 'success',
            filePath: req.file.path,
        });
    } else {
        res.status(400).json({
            status: 'failed',
        });
    }
});

router.post('/avatar', imageUpload('avatar').single('image'), (req, res, next) => {
    // console.log('image upload', req.file.path);

    if (req.file.path) {
        res.status(200).json({
            status: 'success',
            filePath: req.file.path,
        });
    } else {
        res.status(400).json({
            status: 'failed',
        });
    }
});

module.exports = router;
