const express =require('express')

const {
    getStats
}=require('../controllers/TotalDetailsController')

const { verifyToken } = require("../middlleware/token");
const { hasAdmin ,hasAgent } = require("../middlleware/checkRoles");

const router =express.Router()

router.get('/get-stats',verifyToken,hasAdmin,getStats)

module.exports = router
