//This library contains code to store credentials in memory so we can reduce the stress on the hard drives.
module.exports = Cache;
var config = require('config');
var log = require('captains-log')();
var cache = [];

function Cache(request) {

  this.request = request;

}

Cache.prototype.cache_credentials = function(identifier) {

  if (typeof cache[identifier] === "undefined") {

    cache[identifier] = config.get(identifier);
    log.info(identifier + " cached");
  }

  return cache[identifier];
}
