const express =require('express')
const router =express.Router()

const{ 
    createGarbagePrice,
    getGarbagePrice
} =require('../../controllers/Renting/garbage.')
const {requireAuth} =require('../../middlleware/requireAuth')
const {hasAdmin, hasAgent} = require("../../middlleware/checkRoles");
const { verifyToken } = require('../../middlleware/token');

router.post('/', verifyToken,  hasAdmin  , createGarbagePrice)
router.get('/fetch-garbage/:id',verifyToken, hasAdmin  ,getGarbagePrice) 

module.exports=router