const express = require("express");
const assert = require('assert');
const router = express.Router();
const request = require("request");
const MongoClient = require('mongodb').MongoClient;
const DB_URL = "mongodb://localhost:27017/documentsDb";
const CONTRACTS = "contracts"

// GET
router.get("/allContracts", (req, res, next) => {
  MongoClient.connect(DB_URL, (err, db) => {
    db.collection(CONTRACTS).find().toArray((err, data) => {
      assert.equal(err, null);
      res.send(data);
    });
  });
});

// POST 
router.post("/addContract", (req, res) => {
  MongoClient.connect(DB_URL, (err, db) => {
    db.collection(CONTRACTS).insertOne(req.body, (err, result) => {
      assert.equal(err, null);
      res.send("Inserted a document into the contract collection.")
    });
  });
});

module.exports = router;