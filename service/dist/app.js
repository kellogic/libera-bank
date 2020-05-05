'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_express2.default.json());

app.use('/api/v1/', _api2.default);

app.get('/', function (req, res) {
  return res.send('Libera Bank');
});

var port = 3005;
app.listen(port, function () {
  return console.log('Libera Bank server running on port ' + port + '!');
});