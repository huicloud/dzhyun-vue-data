大智慧云vue数据组件
---
提供vue组件方便查询订阅云平台数据

### 使用
1、global
    
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script src="../node_modules/dzhyunjs/dist/dzhyun.js"></script>
    <script src="../dist/dzhyun-vue-data.js"></script>
    <script>
      
      // 使用方式1，直接使用自定义组件 dzhyun-data-source，dzhyun-data-query 和 dzhyun-data-subscribe
      new Vue({
        el: '#app1',
        template: `
          <dzhyun-data-source token="xxxxxx">
            <dzhyun-data-subscribe url="/stkdata" :params="{obj: 'SH000001'}">
              <template scope="props">
                <div>{{props.data && props.data[0].ZuiXinJia}}</div>
              </template>
            </dzhyun-data-subscribe>
          </dzhyun-data-source>
        `,
      });
      
      // 使用方式2，将 DzhyunVueData 以插件的方式注入后，使用 dzhyun-data-query 和 dzhyun-data-subscribe
      Vue.use(DzhyunVueData, {token: 'xxxxxx'});
      new Vue({
        el: '#app2',
        template: `
          <dzhyun-data-subscribe url="/stkdata" :params="{obj: 'SH000001'}">
            <template scope="props">
              <div>{{props.data && props.data[0].ZuiXinJia}}</div>
            </template>
          </dzhyun-data-subscribe>
        `,
      });
      
      // 使用方式3，将 DzhyunVueData 以插件的方式注入后，使用vue实例上注入的 $dzhyun 对象去查询数据
      Vue.use(DzhyunVueData, {token: 'xxxxxx'});
      new Vue({
        el: '#app3',
        template: `
          <div>{{this.dyna.ZuiXinJia}}</div>
        `,
        data: {
          dyna: {}
        },
        created() {
          this.$dzhyun.subscribe('/stkdata', {obj: 'SH000001'}, (data) => {
            this.dyna = data[0];
          });
        }
      });
    </script>

2、模块化

安装

    npm install dzhyun-vue-data

使用

    import DzhyunVueData, { DzhyunDataSource, DzhyunDataQuery, DzhyunDataSubscribe } from 'dzhyun-vue-data';
    ...

### API
##### vue插件
**Vue.use(DzhyunVueData, options)** 会在vue实例中注入一个 $dzhyun 对象，是[Dzhyun](https://github.com/huicloud/dzhyunjs)的一个实例
- **options** `Object` 参照 Dzhyun 创建方法

##### vue组件
**\<dzhyun-data-source\>** 也是创建[Dzhyun](https://github.com/huicloud/dzhyunjs)实例，在本组件和子组件范围中有效，传入的参数作为构造方法的参数，但不支持修改，组件销毁时会调用$dzhyun.close方法

**\<dzhyun-data-query\>** 会调用 $dzhyun 实例的 query 或 subscribe 方法，可以传入的参数如下
- **url** `String` 参照 Dzhyun 实例方法query的参数，修改会重新取消请求后重新查询
- **params** `Object` 参照 Dzhyun 实例方法query的参数，修改会重新取消请求后重新查询
- **shrinkData** `Boolean` 参照 Dzhyun 实例方法query的参数，修改会重新取消请求后重新查询
- **propName** `String` 可选，数据传入子组件对应的属性名称，默认值'data'，
- **initData** `Object|Array` 可选，初始数据，默认空数组[]
- **reset** `Boolean` 可选，是否在修改参数取消请求时，将数据重置为初始数据, 默认false
- **adapt** `Function` 可选，设置数据的处理方法，对于得到的数据后经过该方法处理后再传给子组件，第一个参数是本次的数据，第二个参数是上次的数据
- **autoQuery** `Boolean` 可选，是否会在创建后自动查询，默认true
- **subscribe** `Boolean` 可选，是否订阅查询，默认false

方法
- **query()** 对于不自动查询时可以手动调用该方法查询
- **cancel()** 取消请求，在组件销毁时会自动调用该方法

触发事件
- **v-on:data** 接收到数据触发事件，在adapt处理后传到子组件后触发
- **v-on:error** 接收到错误信息触发事件

**\<dzhyun-data-subcribe\>** 参数和 dzhyun-data-query 相同，subscribe默认为true

##### 注意
在使用上述自定义组件时如果子组件只有单元素时，不会创建额外元素，但如果子组件是多个时，由于vue组件不允许复数元素，因此会额外创建一个div元素去包覆子组件
