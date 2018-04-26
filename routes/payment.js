var express = require("express");
var router = express.Router();
var config = require("config");
var cache_lib = require("../application/helpers/cache.js");
card_id = "";

router.post("/credit_card", function(req, res, next) {
  route(req, res, "credit_card");
});

router.post("/recurrent_payment", function(req, res, next) {
  route(req, res, "recurrent_payment");
});

router.post("/debit_card", function(req, res, next) {
  route(req, res, "debit_card");
});

router.post("/bank_transfer", function(req, res, next) {
  route(req, res, "bank_transfer");
});

router.post("/boleto", function(req, res, next) {
  route(req, res, "boleto");
});

router.post("/tokenize", function(req, res, next) {
  route(req, res, "tokenizeCard");
});

function pre_cache(request) {
  cache = new cache_lib(request);
  return cache.cache_credentials(request.body.identifier);
}

function route(req, res, functionName) {
  var cached = pre_cache(req);
  var processor_library = require("../application/modules/" +
    cached.Payment.processor +
    ".js");
  var processor = new processor_library(req, res, cached);
  processor_response = processor[functionName]();
}

module.exports = router;