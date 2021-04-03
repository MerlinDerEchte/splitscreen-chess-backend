const express = require("express");
const router = express.Router();
const uuid = require('uuid');


router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});




module.exports = router;