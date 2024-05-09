const express =require('express')
const router =express.Router()

const{ 
    CreateClientInfo,
    gettingClientInfo
} =require('../controllers/ClientDetails')
const { verifyToken } = require('../middlleware/token')


router.post('/',verifyToken, CreateClientInfo)
router.get('/appointment/:id',verifyToken, gettingClientInfo)

module.exports=router