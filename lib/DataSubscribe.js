'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _DataQuery = require('./DataQuery');

var _DataQuery2 = _interopRequireDefault(_DataQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by jiagang on 2017/5/16.
 */
exports.default = _vue2.default.component('dzhyun-data-subscribe', {
  extends: _DataQuery2.default,
  props: {
    subscribe: {
      type: Boolean,
      default: true
    }
  }
});