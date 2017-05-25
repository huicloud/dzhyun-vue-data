import Vue from 'vue';
import plugin from './plugin';

export default Vue.component('dzhyun-data-source', {
  props: ['address', 'dataType', 'token', 'compresser'],
  created() {
    const dzhyun = plugin.getInstance(this.$props);

    // Vue只会注册一次插件
    Vue.use(plugin, { dzhyun });
    this.$dzhyun = dzhyun;
  },
  destroyed() {
    // 实例销毁后，关闭连接
    this.$dzhyun.close();
  },
  render(h) {
    const children = this.$slots.default || [];
    if (children.length <= 1) {
      return children[0];
    }
    return h('div', { class: 'dzhyun-data-source' }, children);
  },
});
