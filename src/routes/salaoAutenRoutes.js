const express = require("express");
const router = express.Router();
const autenController = require("../controller/salaoAutenController");


router.post("/cadastrar/auten", autenController.criarAuten);


module.exports = router;
