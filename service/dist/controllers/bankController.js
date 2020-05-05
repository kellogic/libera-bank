'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getChange = exports.setCoins = exports.addCoins = exports.getCoins = exports.getBalance = undefined;

var _bank = require('../db/bank');

var _bank2 = _interopRequireDefault(_bank);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getBalance(req, res) {
    var balance = _bank2.default.coins.reduce(function (sum, coin) {
        return sum + coin.count * coin.value;
    }, 0);
    return res.json(balance / 100);
}

function getCoins(req, res) {
    var coins = _bank2.default.coins.map(function (_ref) {
        var name = _ref.name,
            count = _ref.count;
        return { name: name, count: count };
    });
    return res.json(coins);
}

function addCoins(req, res) {
    var coins = req.body;
    _bank2.default.coins.forEach(function (coin) {
        coin.count += coins[coin.name] || 0;
    });
    return res.json('success');
}

function setCoins(req, res) {
    var coins = req.body;
    _bank2.default.coins.forEach(function (coin) {
        coin.count = coins[coin.name] || 0;
    });
    return res.json('success');
}

function getChange(req, res) {
    return res.json(makeChange(req.body.cents));
}

function makeChange(amt) {
    var change = [];
    var result = {
        code: 0,
        coins: change
    };
    _bank2.default.coins.forEach(function (coin) {
        if (amt >= coin.value) {
            var qty = amt / coin.value | 0;
            if (qty > coin.count) {
                qty = coin.count;
            }
            if (qty) {
                change.push({ name: coin.name, count: qty });
                amt -= qty * coin.value;
            }
        }
    });
    if (amt === 0) {
        // Remove coins
        change.forEach(function (coin) {
            var till = _bank2.default.coins.find(function (c) {
                return c.name === coin.name;
            });
            if (till) {
                till.count -= coin.count;
            }
        });
    } else {
        result.code = 1;
        result.msg = 'Cannot make change';
    }

    return result;
}

exports.getBalance = getBalance;
exports.getCoins = getCoins;
exports.addCoins = addCoins;
exports.setCoins = setCoins;
exports.getChange = getChange;