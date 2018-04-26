module.exports = Mercadopago;
var config = require('config');
var MP = require("mercadopago");
var utilities = require('../helpers/utils.js');

function Mercadopago(request, res, config) {

    this.token = request.body.token;
    this.request = request;
    this.response = res;
    this.mercadopago_config = config;
    this.mercadopago = new MP(config.Mercadopago.api.access_token);

}

Mercadopago.prototype.credit_card = function() {

    res = this.response;
    var doPayment = this.mercadopago.post("/v1/payments", {
        "transaction_amount": Number(this.request.body.price),
        "token": this.token,
        "description": this.request.body.description,
        "installments": Number(this.request.body.installments),
        "payment_method_id": this.request.body.method,
        "payer": {
            "email": this.request.body.email
        }
    });

    process_result(doPayment);

}

Mercadopago.prototype.boleto = function() {

    res = this.response;
    var doPayment = this.mercadopago.post("/v1/payments", {

        "transaction_amount": Number(this.request.body.price),
        "description": this.request.body.description,
        "payment_method_id": "bolbradesco",

        "payer": {

            "email": this.request.body.email,
            "first_name": this.request.body.first_name,
            "last_name": this.request.body.last_name,

            "identification": {
                "type" : "CPF",
                "number" : this.request.body.cpf
            }
        },

        "additional_info": {

            "payer": {
                "first_name": this.request.body.first_name,
                "last_name": this.request.body.last_name,
            },
        }

    });

    process_result(doPayment);

}


Mercadopago.prototype.tokenizeCard = function() {

    var public_key = this.mercadopago_config.Mercadopago.api.public_key;
     res = this.response;
     var doPayment = this.mercadopago.post({
        "uri": "/v1/card_tokens?public_key=" + public_key,
        "authenticate": true,
        data: { "device": { "meli": { "session_id": "76588876200500b444779cebeba19e240b2f3e9e739c3e0ce739407eda0611ef" } }, "card_number": this.request.body.card_number, "security_code": this.request.body.card_exp, "expiration_month": this.request.body.exp_month, "expiration_year": this.request.body.first_year, "cardholder": { "name": this.request.body.owner_name, "identification": { "type": "CPF", "number": this.request.body.owner_cpf } } }
    })

    process_result(doPayment);
}


function process_result(doPayment) {

    var utils = new utilities;
    doPayment.then(
        function(payment) {

            utils.response(payment, res);
        },
        function(error) {

            utils.response({ status: error.status, message: error.message }, res);
        });
}
