const express = require("express");
const {
  createDetails,
  getAllDetails,
  getSingelDetails,
  deleteDetails,
  updateDetails,

  ownCompound,
  RentalHouse,
  BnBHouse,
  grtDetailsById,
  getAllHouses,
  getAllTours,
  getAllHousesByName,
  getProductsInCategory,
  fetchHousesByNames,
  getRelevantAgentToAhouse
} = require("../controllers/Details");
const { imageUpload } = require("../middlleware/upload");
const {
  requireAuth,
  isAdmin,
  checkIfOwner,
} = require("../middlleware/requireAuth");
const { hasAdmin } = require("../middlleware/checkRoles");
const { verifyToken } = require("../middlleware/token");

const router = express.Router();
// router.use(requireAuth);
router.post("/",verifyToken, imageUpload, createDetails);
router.get("/allHouses", getAllHouses);
router.get("/relevant-agent", verifyToken, hasAdmin,  getRelevantAgentToAhouse);
router.get("/fetchHousesByName/",verifyToken, hasAdmin,  getAllHousesByName);
router.get("/housesLinkedToTenants",verifyToken,fetchHousesByNames);
router.get("/byUserId", getAllDetails);
router.get("/Bungalow", ownCompound);
router.get("/Maisonette", RentalHouse);
router.get("/Apartments", BnBHouse);
router.get("/TourRequest", getAllTours);
router.get("/fetchDetailsCategory/:category", getProductsInCategory);
router.get("/single-house/:id", verifyToken, getSingelDetails);
router.get("/byId", getSingelDetails);
router.delete("/:id",verifyToken, hasAdmin, deleteDetails);
router.get("/:id", grtDetailsById);
router.patch("/:id", checkIfOwner, imageUpload, updateDetails);

module.exports = router;
