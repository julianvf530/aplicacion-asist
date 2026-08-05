const express = require("express");

const router = express.Router();

const exportController =
    require("../controllers/export.controller");


router.get(
    "/:id",
    exportController.exportEnsayo
);


module.exports = router;