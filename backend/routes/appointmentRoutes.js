const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  bookAppointment,
  cancelAppointment,
  getAppointments,
} = require("../controllers/appointmentController");

router.use(authMiddleware);
router.post("/book", bookAppointment);
router.put("/cancel/:id", cancelAppointment);
router.get("/", getAppointments);

module.exports = router;
