const express = require("express");
const assert = require('assert');
const path = require('path');
const router = express.Router();
const request = require("request");
const multer = require("multer");

// storage
const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "_" + Date.now() + "_" + path.extname(file.originalname));
  }
});

const upload = multer({storage: Storage});

// POST 
router.post("/", upload.array("file", 3), (req, res, next) => {
	if (!req.files) {
    console.log("No file received");
    return res.send({
      success: false
    });
  } else {
    console.log('file received');
    return res.send({
      success: true,
      data: req.files
    })
  }
})

// GET 
router.get("/:value", (req, res) => {
  var dir = "public/uploads/";
  res.sendFile(req.params.value, { 
    root: dir  
  });
})

module.exports = router;