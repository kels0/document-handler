const express = require("express");
const router = express.Router();
const request = require("request");
const URL = "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/10/";

/* GET api listing. */
router.get("/stations", function(req, res) {
  request({
    uri: URL + "station-set/all/period/latest-hour/data.json",
  }).pipe(res);
});

router.get("/station/:station/:period", function(req, res) {
  request({
    uri: URL + "station/" + req.params.station + "/period/" + req.params.period + "/data.json",
  }).pipe(res);
});

module.exports = router;