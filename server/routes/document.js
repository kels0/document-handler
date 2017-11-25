const express = require("express");
const assert = require('assert');
const path = require('path');
const router = express.Router();
const request = require("request");
const MongoClient = require('mongodb').MongoClient;
const DB_URL = "mongodb://localhost:27017/documentsDb";
const DOCUMENTS = "documents"

// POST 
router.post("/addDocument", (req, res) => {
  MongoClient.connect(DB_URL, (err, db) => {
    db.collection(DOCUMENTS).insertOne(req.body, (err, result) => {
      assert.equal(err, null);
      res.send("Inserted a document into the documents collection.")
    });
  });
});

// POST 
router.put("/updateDocument", (req, res) => {
  const documentId = req.body.id;
  const data = req.body;
  MongoClient.connect(DB_URL, (err, db) => {
    db.collection(DOCUMENTS).updateOne(
      { 
        "id": documentId 
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
      res.send("Updated a document into the document collection.")
    });
  });
});

// DELETE 
router.delete("/deleteDocument/:id", (req, res) => {
  const documentId = req.params.id;
  MongoClient.connect(DB_URL, (err, db) => {
    db.collection(DOCUMENTS).deleteOne({ "id": documentId }, (err, result) => {
      assert.equal(err, null);
      res.send("Deleted a document from the document collection.")
    });
  });
});

// GET 
router.get("/getDocument/:searchString/:type", (req, res, next) => {
  const searchString = req.params.searchString;
  const type = req.params.type;
  MongoClient.connect(DB_URL, (err, db) => {
    db.collection(DOCUMENTS).find({
      "name": { $regex : new RegExp(searchString, "i")},
      "type": { $regex : new RegExp(type, "i")},  
    }).toArray((err, data) => {
      assert.equal(err, null);
      res.send(data);
    });
  });
});

module.exports = router;