'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bankController = require('../controllers/bankController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/balance', _bankController.getBalance);
router.get('/coins', _bankController.getCoins);
router.put('/coins', _bankController.setCoins);
router.patch('/coins', _bankController.addCoins);
router.post('/addcoins', _bankController.addCoins);
router.post('/change', _bankController.getChange);

exports.default = router;