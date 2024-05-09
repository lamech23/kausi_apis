const express =require('express')
const router =express.Router()
const {
    createImages,
    getImages
}=require('../controllers/imageController');
const {requireAuth } =require('../middlleware/requireAuth');
const {imageUpload } =require('../middlleware/upload');
const { verifyToken } = require('../middlleware/token');

router.post('/', verifyToken, imageUpload, createImages);
router.get('/fetchImages',verifyToken, getImages);

module.exports = router