//This library contains some functions meant to be reused across the entire project
module.exports = Utils;

function Utils() {

}

Utils.prototype.response = function(content, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(content, null, 4));
}

