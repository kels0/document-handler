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

router.get("/getContract/:value", (req, res, next) => {
  const name = req.params.value;
  MongoClient.connect(DB_URL, (err, db) => {
    db.collection(CONTRACTS).find({"name": { $regex : new RegExp(name, "i")}}).toArray((err, data) => {
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

// POST 
router.put("/updateContract", (req, res) => {
  const contractId = req.body.id;
  const data = req.body;
  MongoClient.connect(DB_URL, (err, db) => {
    db.collection(CONTRACTS).updateOne(
      { 
        "id": contractId 
      }, 
      { 
        $set: 
        {
          "name": data.name,
          "description": data.description,
          "type": data.type,
          "fileLocation": data.fileLocation
        }
    }, (err, result) => {
      assert.equal(err, null);
      res.send("Updated a document into the contract collection.")
    });
  });
});

// DELETE 
router.delete("/deleteContract/:id", (req, res) => {
  console.log("delete a documnet");
  const contractId = req.params.id;
  MongoClient.connect(DB_URL, (err, db) => {
    db.collection(CONTRACTS).deleteOne({ "id": contractId }, (err, result) => {
      assert.equal(err, null);
      res.send("Deleted a document from the contract collection.")
    });
  });
});

module.exports = router;