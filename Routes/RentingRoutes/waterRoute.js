const express =require('express')
const router =express.Router()

const{ 
    createWater,
    getWater
} =require('../../controllers/Renting/waterController')
const {requireAuth} =require('../../middlleware/requireAuth')
const {hasAdmin, hasAgent} = require("../../middlleware/checkRoles");
const { verifyToken } = require('../../middlleware/token');

router.post('/', verifyToken,  hasAdmin  , requireAuth, createWater)
router.get('/fetchWater/:id',verifyToken, hasAdmin  , getWater)

module.exports=router