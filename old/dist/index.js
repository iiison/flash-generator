#!/usr/bin/env node
var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _clear = require('clear');

var _clear2 = _interopRequireDefault(_clear);

var _figlet = require('figlet');

var _figlet2 = _interopRequireDefault(_figlet);

var _cloneFlash = require('./lib/cloneFlash');

var _cloneFlash2 = _interopRequireDefault(_cloneFlash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _clear2.default)();

console.log(_chalk2.default.green(_figlet2.default.textSync('Flash', {
  horizontalLayout: 'default',
  font: 'Doh'
})));

(0, _cloneFlash2.default)();