const express =require('express')
const router =express.Router()
const {
    userLoginProccess,
    getRequest,
    updateStatus
}=require('../controllers/loginUserProcessController')



router.post('/',  userLoginProccess)
router.get('/fetchRequests',  getRequest)
router.patch('/update-status/:id',  updateStatus)




module.exports = router