(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Vue"), require("Dzhyun"));
	else if(typeof define === 'function' && define.amd)
		define(["Vue", "Dzhyun"], factory);
	else if(typeof exports === 'object')
		exports["DzhyunVueData"] = factory(require("Vue"), require("Dzhyun"));
	else
		root["DzhyunVueData"] = factory(root["Vue"], root["Dzhyun"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = _vue2.default.component('dzhyun-data-query', {
  props: {
    url: {
      type: String,
      required: true
    },
    params: Object,
    shrinkData: {
      type: Boolean,
      default: true
    },
    propName: {
      type: String,
      default: 'data'
    },

    // 初始数据，默认[]
    initData: {
      type: [Object, Array],
      default: function _default() {
        return [];
      }
    },

    // 是否在改变参数时重置数据为初始数据
    reset: {
      type: Boolean,
      default: false
    },
    adapt: Function,

    // 是否自动查询，默认true
    autoQuery: {
      type: Boolean,
      default: true
    },

    // 是否订阅数据，默认false
    subscribe: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      request: null,
      data: null,
      paramsStr: null
    };
  },
  computed: {
    queryArguments: function queryArguments() {
      return [this.url, JSON.parse(this.paramsStr), this.callback, this.shrinkData];
    },
    output: function output() {
      return this.data || this.initData;
    }
  },
  watch: {
    params: {
      handler: function handler() {
        this.paramsStr = JSON.stringify(this.params || {});
      },
      deep: true,
      immediate: true
    },

    // 查询参数变化，取消订阅后重新查询
    queryArguments: function queryArguments() {
      if (this.autoQuery) {
        this.cancel();
        this.query();
      }
    }
  },
  methods: {
    query: function query() {
      var dzhyun = this.$dzhyun;
      if (!dzhyun) {
        console.warn('未创建Dzhyun');
        return;
      }
      this.request = this.subscribe ? dzhyun.subscribe.apply(dzhyun, _toConsumableArray(this.queryArguments)) : dzhyun.query.apply(dzhyun, _toConsumableArray(this.queryArguments));
    },
    cancel: function cancel() {
      if (this.request) {
        this.request.cancel();
      }
      if (this.reset) {
        this.data = null;
      }
    },
    callback: function callback(result) {
      if (result instanceof Error) {
        this.$emit('error', result);
      } else {
        if (this.adapt) result = this.adapt(result, this.data);
        this.$dzhyunData = result;
        this.data = result;
        this.$emit('data', result);
      }
    }
  },
  beforeMount: function beforeMount() {
    if (this.autoQuery) {
      // 挂载前第一次请求
      this.query();
    }
  },
  destroyed: function destroyed() {
    // 实例销毁后，取消订阅
    this.cancel();
  },
  render: function render(h, ctx) {
    var _this = this;

    var children = [];

    // 将数据注入子组件的props
    if (this.$slots.default) {
      children.push.apply(children, _toConsumableArray(this.$slots.default.map(function (vnode) {
        if (vnode.componentOptions && vnode.componentOptions.propsData) {
          vnode.componentOptions.propsData[_this.propName] = _this.output;
        }
        return vnode;
      })));
    }
    if (this.$scopedSlots && this.$scopedSlots.default) {
      children.push.apply(children, _toConsumableArray(this.$scopedSlots.default(_defineProperty({}, this.propName, this.output))));
    }
    if (children.length <= 1) {
      return children[0];
    }
    return h('div', { class: 'dzhyun-data-query' }, children);
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dzhyunjs = __webpack_require__(6);

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _plugin = __webpack_require__(2);

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('dzhyun-data-source', {
  props: ['address', 'dataType', 'token', 'compresser'],
  created: function created() {
    var dzhyun = _plugin2.default.getInstance(this.$props);

    // Vue只会注册一次插件
    _vue2.default.use(_plugin2.default, { dzhyun: dzhyun });
    this.$dzhyun = dzhyun;
  },
  destroyed: function destroyed() {
    // 实例销毁后，关闭连接
    this.$dzhyun.close();
  },
  render: function render(h) {
    var children = this.$slots.default || [];
    if (children.length <= 1) {
      return children[0];
    }
    return h('div', { class: 'dzhyun-data-source' }, children);
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _DataQuery = __webpack_require__(1);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _plugin = __webpack_require__(2);

var _plugin2 = _interopRequireDefault(_plugin);

var _DataSource = __webpack_require__(3);

var _DataSource2 = _interopRequireDefault(_DataSource);

var _DataQuery = __webpack_require__(1);

var _DataQuery2 = _interopRequireDefault(_DataQuery);

var _DataSubscribe = __webpack_require__(4);

var _DataSubscribe2 = _interopRequireDefault(_DataSubscribe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.assign(_plugin2.default, { DzhyunDataSource: _DataSource2.default, DzhyunDataQuery: _DataQuery2.default, DzhyunDataSubscribe: _DataSubscribe2.default });

module.exports = _plugin2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=dzhyun-vue-data.js.map