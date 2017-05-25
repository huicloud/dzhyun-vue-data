'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _plugin = require('./plugin');

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