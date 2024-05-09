const express =require('express')
const router =express.Router()
const {
    createNewsLetter,
    getNewsLetter,
    deleteNewsletter
}=require('../controllers/NewsLetterController')

const { hasAdmin } = require("../middlleware/checkRoles");


router.post('/', hasAdmin ,createNewsLetter)
router.get('/newsLetter',hasAdmin ,getNewsLetter)
router.delete('/deleteNewsLetter/:id',hasAdmin,deleteNewsletter)



module.exports = router