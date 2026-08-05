const express = require("express");
const multer = require("multer");

const importController = require("../controllers/import.controller");

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/members",
    upload.single("file"),
    importController.importMembers
);

module.exports = router;