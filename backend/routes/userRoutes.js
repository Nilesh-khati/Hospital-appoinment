const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getDoctors, getPatients } = require("../controllers/userController");

router.use(authMiddleware);
router.get("/doctors", getDoctors);
router.get("/patients", getPatients);

module.exports = router;
