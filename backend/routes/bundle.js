const express = require("express");
const router = express.Router();
const bundleController = require("../controllers/bundle");

router.post("/create", bundleController.createBundle);
router.get("/", bundleController.get);
router.get("/bundles", bundleController.getbundles);

module.exports = router;
