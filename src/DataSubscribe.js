/**
 * Created by jiagang on 2017/5/16.
 */
import Vue from 'vue';
import DataQuery from './DataQuery';

export default Vue.component('dzhyun-data-subscribe', {
  extends: DataQuery,
  props: {
    subscribe: {
      type: Boolean,
      default: true,
    },
  }
})
