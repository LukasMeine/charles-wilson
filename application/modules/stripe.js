module.exports = Stripe;
var utilities = require('../helpers/utils.js');
var utils = new utilities;

function Stripe(request, res, config) {

    this.request = request;
    this.response = res;
    this.stripe = require("stripe")(config.Stripe.api.secret_key);
}

Stripe.prototype.credit_card = function() {
    res = this.response;

    var charge = this.stripe.charges.create({
        amount: this.request.body.price,
        currency: "brl",
        description: this.request.body.description,
        source: this.request.body.token,
    }, function(err, charge) {

        if (err !== null) {
            utils.response({ code: 400, message: err.message }, res);
        } else {
            utils.response(charge, res);
        }

    });

}
