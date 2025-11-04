const express = require("express");
const router = express.Router();

const { generateReadMeController } = require("../controllers");

router.post("/generate-readMe", generateReadMeController);

module.exports = router;
