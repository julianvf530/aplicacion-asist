const express = require("express");

const router = express.Router();

const ensayosController = require("../controllers/ensayos.controller");


router.get("/", ensayosController.getAllEnsayos);

router.post("/", ensayosController.createEnsayo);

router.delete("/:id", ensayosController.deleteEnsayo);

module.exports = router;