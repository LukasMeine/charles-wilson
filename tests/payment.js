"use strict";
var log = require("captains-log")();
var express = require("express");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
var router = express.Router();
let should = chai.should();
let config = require("config");
chai.use(chaiHttp);

describe("Generate test token", () => {
  it("STRIPE Try to generate a test credit card token", done => {
    stripe_create_card(function() {
      var expect = require("chai").expect;
      expect(card_id).to.be.a("string");
      done();
    });
  });
});

describe("Generate test token", () => {
  it("MERCADOPAGO Try to generate a test credit card token", done => {
    mercadopago_create_card(function() {
      var expect = require("chai").expect;
      expect(card_id).to.be.a("string");
      done();
    });
  });
});

describe("Charge test credit card (Mercadopago)", () => {
  it("Try to charge a credit card with the generated test token (Mercadopago)", function(
    done
  ) {
    chai
      .request(server)
      .post("/payment/credit_card")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        token: card_id,
        price: 100,
        description: "test description",
        identifier: "scorpogenico",
        installments: 2,
        method: "visa",
        email: "test@example.com"
      })
      .end(function(error, response, body) {
        if (error) {
          done(error);
        } else {
          var expect = require("chai").expect;
          expect(response.body.status).to.be.equal(201);
          done();
        }
      });
  });
});

describe("Charge test credit card (Cielo 3.0)", () => {
  it("Try to charge a cielo credit card", function(done) {
    chai
      .request(server)
      .post("/payment/credit_card")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        order_id: "2cA12sA2115Lkakii",
        price: 10000,
        description: "test",
        identifier: "anadrolle",
        installments: 2,
        card_type: "visa",
        card_number: "4235647728025682",
        security_code: "123",
        exp_date: "02/2020",
        card_holder: "José Augusto dos Anjos"
      })
      .end(function(error, response, body) {
        if (error) {
          done(error);
        } else {
          var expect = require("chai").expect;
          expect(response.body.Payment.Provider).to.be.equal("Cielo");
          done();
        }
      });
  });
});

describe("Charge test credit card recurrent payment (Cielo 3.0)", () => {
  it("Try to charge a cielo credit card recurrent payment", function(done) {
    chai
      .request(server)
      .post("/payment/recurrent_payment")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        order_id: "2cA12sA2115Lkakii",
        price: 10000,
        description: "test",
        identifier: "anadrolle",
        installments: 1,
        card_type: "visa",
        card_number: "4235647728025682",
        security_code: "123",
        exp_date: "02/2020",
        card_holder: "José Augusto dos Anjos"
      })
      .end(function(error, response, body) {
        if (error) {
          done(error);
        } else {
          var expect = require("chai").expect;
          log.info(response.body);
          done();
        }
      });
  });
});

describe("Charge test debit card (Cielo 3.0)", () => {
  it("Try to charge a cielo debit card", function(done) {
    chai
      .request(server)
      .post("/payment/debit_card")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        order_id: "2cA12sA2115Lkakii",
        price: 10000,
        return_url: "teste.com",
        identifier: "anadrolle",
        card_type: "visa",
        card_number: "4235647728025682",
        security_code: "123",
        exp_date: "02/2020",
        card_holder: "José Augusto dos Anjos"
      })
      .end(function(error, response, body) {
        if (error) {
          done(error);
        } else {
          var expect = require("chai").expect;
          expect(response.body.Payment.Provider).to.be.equal("Cielo");
          done();
        }
      });
  });
});

describe("Test bank transfer (Cielo 3.0)", () => {
  it("Try to perform a bank transfer", function(done) {
    chai
      .request(server)
      .post("/payment/bank_transfer")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        order_id: "2cA12sA2115Lkakii",
        price: 10000,
        identifier: "anadrolle",
        return_url: "teste.com"
      })
      .end(function(error, response, body) {
        log.info(response.body);
        if (error) {
          done(error);
        } else {
          var expect = require("chai").expect;
          done();
        }
      });
  });
});

describe("Try to generate a boleto (Mercadopago)", () => {
  it("Try to generate a boleto", function(done) {
    chai
      .request(server)
      .post("/payment/boleto")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        price: 100,
        description: "test description",
        first_name: "John",
        last_name: "Doe",
        cpf: "06547495825",
        identifier: "scorpogenico",
        email: "test@example.com",
        cep: "88333-030",
        street_name: "Rua Cambará",
        street_number: "",
        neighborhood: "Praia das Taquaras",
        city: "Balneário Camboriú",
        state: "Santa Catarina"
      })
      .end(function(error, response, body) {
        if (error) {
          done(error);
        } else {
          var expect = require("chai").expect;
          expect(response.body.status).to.be.equal(201);
          done();
        }
      });
  });
});

function mercadopago_create_card(callback) {
  var MP = require("mercadopago");
  var mp = new MP(config.get("scorpogenico.Mercadopago.api.access_token"));

  mp
    .post({
      uri:
        "/v1/card_tokens?public_key=" +
        config.get("scorpogenico.Mercadopago.api.public_key"),
      authenticate: true,
      data: {
        device: {
          meli: {
            session_id:
              "76588876200500b444779cebeba19e240b2f3e9e739c3e0ce739407eda0611ef"
          }
        },
        card_number: "4235647728025682",
        security_code: "123",
        expiration_month: 12,
        expiration_year: 2022,
        cardholder: {
          name: "APRO",
          identification: {
            type: "CPF",
            number: "71165987236"
          }
        }
      }
    })
    .then(function(response) {
      card_id = response.response.id;

      callback();
    });
}

function stripe_create_card(callback) {
  var querystring = require("querystring");
  var http = require("https");
  var fs = require("fs");

  // Build the post string from an object
  var post_data = querystring.stringify({
    "card[number]": 4242424242424242,
    "card[cvc]": 123,
    "card[exp_month]": 12,
    "card[exp_year]": 18,
    "card[address_zip]": 94301,

    key: config.get("scorpogenico.Stripe.api.publishable_key")
  });

  // An object of options to indicate where to post to
  var post_options = {
    host: "api.stripe.com",
    port: "443",
    path: "/v1/tokens",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(post_data)
    }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
    res.setEncoding("utf8");
    res.on("data", function(chunk) {
      card_id = JSON.parse(chunk).id;

      callback();
    });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
}
