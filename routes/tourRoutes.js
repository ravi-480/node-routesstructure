const express = require("express");
const {
  getAllTours,
  getSingleData,
  postData,
  updateData,
} = require("../controllers/tourControllers");

const router = express.Router();


router.route("/").get(getAllTours).post(postData);
router.route("/:id").get(getSingleData).patch(updateData);

module.exports = router;
