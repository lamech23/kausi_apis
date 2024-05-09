const express =require('express')


const {
    getSearch
    
    
}=require('../controllers/SearchApiController')
const { verifyToken } = require('../middlleware/token')

const router =express.Router()

router.get('/search/:keyword',verifyToken, getSearch)

module.exports = router
