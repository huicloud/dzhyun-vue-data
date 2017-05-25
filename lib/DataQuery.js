'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

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

    // 初始数据
    initData: {
      type: Object,
      default: function _default() {
        return null;
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
      }
      if (this.adapt) result = this.adapt(result, this.data);
      this.$dzhyunData = result;
      this.data = result;
      this.$emit('data', result);
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