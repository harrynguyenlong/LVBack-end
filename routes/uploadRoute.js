const express = require('express');
const imageUpload = require('../middlewares/imageUpload');

const router = express.Router();

router.post('/', imageUpload.single('image'), (req, res, next) => {
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
