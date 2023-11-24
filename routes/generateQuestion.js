const express = require("express");
const generatedQuestion = require("../Controller/generatedQuestion");
const router = express.Router();

router.route("/:totalMarks").post(generatedQuestion);

module.exports = router;