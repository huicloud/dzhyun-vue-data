'use strict';

var _plugin = require('./plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _DataSource = require('./DataSource');

var _DataSource2 = _interopRequireDefault(_DataSource);

var _DataQuery = require('./DataQuery');

var _DataQuery2 = _interopRequireDefault(_DataQuery);

var _DataSubscribe = require('./DataSubscribe');

var _DataSubscribe2 = _interopRequireDefault(_DataSubscribe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.assign(_plugin2.default, { DzhyunDataSource: _DataSource2.default, DzhyunDataQuery: _DataQuery2.default, DzhyunDataSubscribe: _DataSubscribe2.default });

module.exports = _plugin2.default;