const express = require("express");
const assert = require('assert');
const path = require('path');
const router = express.Router();
const request = require("request");
const multer = require("multer");
const fs = require('fs');
const mime = require('mime-types');
const pathToFolder = "public/uploads/";

// storage
const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + pathToFolder);
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
  res.sendFile(req.params.value, { 
    root: pathToFolder  
  });
})

// DELETE 
router.delete("/:value", (req, res) => {
  var fileNames = req.params.value.split(",");
  for (var i = 0; i <fileNames.length; i++) {
    if (fileNames[i]) {
      fs.unlink(pathToFolder + fileNames[i]);
    }
  }
  res.send("successfully removed file");
})

module.exports = router;