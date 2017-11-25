const express = require("express");
const assert = require('assert');
const path = require('path');
const router = express.Router();
const request = require("request");
const MongoClient = require('mongodb').MongoClient;
const DB_URL = "mongodb://localhost:27017/documentsDb";
const DOCUMENTS = "documents"

// GET
router.get("/allContracts", (req, res, next) => {
  MongoClient.connect(DB_URL, (err, db) => {
    db.collection(DOCUMENTS).find({"type": "contract"}).toArray((err, data) => {
      assert.equal(err, null);
      res.send(data);
    });
  });
});

router.get("/getContract/:value", (req, res, next) => {
  const name = req.params.value;
  MongoClient.connect(DB_URL, (err, db) => {
    db.collection(DOCUMENTS).find({
      "name": { $regex : new RegExp(name, "i")},
      "type": "contract"  
    }).toArray((err, data) => {
      assert.equal(err, null);
      res.send(data);
    });
  });
});

module.exports = router;