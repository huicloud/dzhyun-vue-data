'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dzhyunjs = require('dzhyunjs');

var _dzhyunjs2 = _interopRequireDefault(_dzhyunjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var dzhyun = options.dzhyun;
    if (!dzhyun) {
      dzhyun = this.getInstance(options);
    }
    Object.defineProperties(Vue.prototype, {
      $dzhyun: {
        configurable: true,
        get: function get() {
          return this.$parent ? this.$parent.$dzhyun : dzhyun;
        },
        set: function set(value) {
          Object.defineProperties(this, {
            $dzhyun: {
              writable: true,
              value: value
            }
          });
        }
      },
      $dzhyunData: {
        configurable: true,
        get: function get() {
          return this.$parent ? this.$parent.$dzhyunData : null;
        },
        set: function set(value) {
          Object.defineProperties(this, {
            $dzhyunData: {
              writable: true,
              value: value
            }
          });
        }
      }
    });
  },
  getInstance: function getInstance(options) {
    return new _dzhyunjs2.default(options);
  }
};