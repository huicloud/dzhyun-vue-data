import Vue from 'vue';

export default Vue.component('dzhyun-data-query', {
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
      default: 'data',
    },

    // 初始数据，默认[]
    initData: {
      type: [Object, Array],
      default: function() { return []; },
    },

    // 是否在改变参数时重置数据为初始数据
    reset: {
      type: Boolean,
      default: false,
    },
    adapt: Function,

    // 是否自动查询，默认true
    autoQuery: {
      type: Boolean,
      default: true,
    },

    // 是否订阅数据，默认false
    subscribe: {
      type: Boolean,
      default: false,
    },
  },
  data: function() {
    return {
      request: null,
      data: null,
      paramsStr: null,
    };
  },
  computed: {
    queryArguments() {
      return [this.url, JSON.parse(this.paramsStr), this.callback, this.shrinkData];
    },
    output() {
      return this.data || this.initData;
    },
  },
  watch: {
    params: {
      handler: function() {
        this.paramsStr = JSON.stringify(this.params || {});
      },
      deep: true,
      immediate: true,
    },

    // 查询参数变化，取消订阅后重新查询
    queryArguments() {
      if (this.autoQuery) {
        this.cancel();
        this.query();
      }
    }
  },
  methods: {
    query() {
      const dzhyun = this.$dzhyun;
      if (!dzhyun) {
        console.warn('未创建Dzhyun');
        return;
      }
      this.request = this.subscribe ? dzhyun.subscribe(...this.queryArguments) : dzhyun.query(...this.queryArguments);
    },
    cancel() {
      if (this.request) {
        this.request.cancel();
      }
      if (this.reset) {
        this.data = null;
      }
    },
    callback(result) {
      if (result instanceof Error) {
        this.$emit('error', result);
      } else {
        if (this.adapt) result = this.adapt(result, this.data);
        this.$dzhyunData = result;
        this.data = result;
        this.$emit('data', result);
      }
    },
  },
  beforeMount() {
    if (this.autoQuery) {
      // 挂载前第一次请求
      this.query();
    }
  },
  destroyed() {
    // 实例销毁后，取消订阅
    this.cancel();
  },
  render(h, ctx) {
    const children = [];
    
    // 将数据注入子组件的props
    if (this.$slots.default) {
      children.push(...this.$slots.default.map((vnode) => {
        if (vnode.componentOptions && vnode.componentOptions.propsData) {
          vnode.componentOptions.propsData[this.propName] = this.output;
        }
        return vnode;
      }));
    }
    if (this.$scopedSlots && this.$scopedSlots.default) {
      children.push(...this.$scopedSlots.default({
        [this.propName]: this.output,
      }));
    }
    if (children.length <= 1) {
      return children[0];
    }
    return h('div', { class: 'dzhyun-data-query' }, children);
  },
});
