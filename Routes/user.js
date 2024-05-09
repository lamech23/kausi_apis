const express =require('express')
const router =express.Router()
const {
    loginUser,
    signupUser,
    getAllUsers,
    reset,
    forgotPassword,
    deleteUser,
    updateUserEmail,
    getUserById,
    deactivate,
    logout,
    managment,
    getManagemts,
    verifyUser,
    getUserForUpdating,
    getAllUsersForAdminStats
}=require('../controllers/UserControllers')

const { verifyToken } = require("../middlleware/token");
const { hasAdmin ,hasAgent } = require("../middlleware/checkRoles");

router.post('/login',loginUser)
router.post('/logout',verifyToken, logout)
router.get('/all',verifyToken,hasAdmin,getAllUsers)
router.get('/all-user',verifyToken,hasAdmin,getAllUsersForAdminStats)
router.post('/signup',verifyToken, signupUser)
router.post('/forgotPassword', forgotPassword)
router.put('/reset/:id', reset)
router.patch('/userUpdate/:id',verifyToken, updateUserEmail)
router.delete('/:id', deleteUser)
router.get('/specificUser/',verifyToken, getUserById,)
router.get('/single-user/:id',verifyToken, getUserForUpdating,)
router.patch('/userStatus/:id', deactivate)
router.patch('/verifyUser/:id', verifyUser)
router.post('/assing', managment)
router.get('/fetchAgent', getManagemts)

module.exports = router

