const express =require('express')


const {RequstingAtour}=require('../controllers/Details')
const {gettingClientInfo}=require('../controllers/ClientDetails')
const { verifyToken } = require('../middlleware/token')

const router =express.Router()

router.post('/tour',verifyToken,RequstingAtour)
router.get('/specificTourRequest', verifyToken,gettingClientInfo)

module.exports = router
