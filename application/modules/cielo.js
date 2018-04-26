module.exports = Cielo;
var utilities = require('../helpers/utils.js');
var https = require('https');

function Cielo(request, res, config) {

  this.request = request;
  this.response = res;
  this.cielo_config = config;
}

Cielo.prototype.bank_transfer = function() {

  var post_data = JSON.stringify({
    "MerchantOrderId": this.request.body.order_id,
    "Payment": {
      "Type": "EletronicTransfer",
      "ReturnUrl":this.request.body.return_url,
      "Amount": this.request.body.price,
      "Provider": "Bradesco"
    }
  });

  send_request(post_data, this.request, this.response, '/1/sales/',this.cielo_config);
}

Cielo.prototype.debit_card = function() {

  var post_data = JSON.stringify({
    "MerchantOrderId": this.request.body.order_id,
    "Payment": {
      "Type": "DebitCard",
      "ReturnUrl":this.request.body.return_url,
      "Amount": this.request.body.price,
      "DebitCard": {
        "CardNumber": this.request.body.card_number,
        "Holder": this.request.body.card_holder,
        "ExpirationDate": this.request.body.exp_date,
        "SecurityCode": this.request.body.security_code,
        "Brand": this.request.body.card_type
      }
    }
  });

  send_request(post_data, this.request, this.response, '/1/sales/',this.cielo_config);
}

Cielo.prototype.credit_card = function() {

  var post_data = JSON.stringify({
    "MerchantOrderId": this.request.body.order_id,
    "Payment": {
      "Type": "CreditCard",
      "Amount": this.request.body.price,
      "Installments": this.request.body.installments,
      "SoftDescriptor": this.request.body.description,
      "CreditCard": {
        "CardNumber": this.request.body.card_number,
        "Holder": this.request.body.card_holder,
        "ExpirationDate": this.request.body.exp_date,
        "SecurityCode": this.request.body.security_code,
        "Brand": this.request.body.card_type
      }
    }
  });

  send_request(post_data, this.request, this.response, '/1/sales/',this.cielo_config);
}

Cielo.prototype.recurrent_payment = function() {

  var post_data = JSON.stringify({
    "MerchantOrderId": this.request.body.order_id,
    "Payment": {
      "Type": "CreditCard",
      "Amount": this.request.body.price,
      "Installments": this.request.body.installments,
      "SoftDescriptor": this.request.body.description,
      "RecurrentPayment":{
             "AuthorizeNow":"false",
             "Interval":"Monthly"
           },
      "CreditCard": {
        "CardNumber": this.request.body.card_number,
        "Holder": this.request.body.card_holder,
        "ExpirationDate": this.request.body.exp_date,
        "SecurityCode": this.request.body.security_code,
        "Brand": this.request.body.card_type
      }
    }
  });

  send_request(post_data, this.request, this.response, '/1/sales/',this.cielo_config);
}


function send_request(post_data, req, res, url,config) {

  var utils = new utilities;
  var post_options = {
    host: 'api.cieloecommerce.cielo.com.br',
    port: '443',
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(post_data),
      "MerchantId": config.Cielo.api.merchant_id,
      "MerchantKey": config.Cielo.api.merchant_key,
    }
  };

  var post_req = https.request(post_options, function(response) {
    response.setEncoding('utf8');
    response.on('data', function(payment) {

      utils.response(JSON.parse(payment), res);
    });
  });

  post_req.write(post_data);
  post_req.end();
}
