const express =require('express')
const router =express.Router()

const{ 
    RegisteringHouse,
    getTenants,
    getAllHouses,
    subtotal, 
    creatHouseCategory,
    getAllHousesByName,
    getTenantForTenantRegistration,
    getHouseByHouseName

} =require('../../controllers/Renting/HouseRegistrationController')
const { verifyToken } = require('../../middlleware/token')
const { hasAdmin, hasAgent } = require('../../middlleware/checkRoles')



router.post('/',verifyToken, hasAdmin  ,RegisteringHouse)
router.get('/specific/', verifyToken,hasAdmin ,getTenants)
router.get('/houseNames/',verifyToken,hasAdmin , getTenantForTenantRegistration)
router.get('/total/:id',verifyToken,hasAdmin ,  subtotal)
router.get('/:houseId', verifyToken, hasAdmin, getAllHouses)
router.get('/houseByHouseName' ,verifyToken, hasAdmin,getHouseByHouseName)
router.get('/houseNames', verifyToken, hasAdmin ,getAllHousesByName)
router.post('/houseName',verifyToken,  hasAdmin ,creatHouseCategory)

module.exports=router