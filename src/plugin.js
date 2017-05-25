import Dzhyun from 'dzhyunjs';

export default {
  install(Vue, options = {}) {
    let dzhyun = options.dzhyun;
    if (!dzhyun) {
      dzhyun = this.getInstance(options);
    }
    Object.defineProperties(Vue.prototype, {
      $dzhyun: {
        configurable: true,
        get: function() {
          return this.$parent ? this.$parent.$dzhyun : dzhyun;
        },
        set: function(value) {
          Object.defineProperties(this, {
            $dzhyun: {
              writable: true,
              value
            }
          });
        },
      },
      $dzhyunData: {
        configurable: true,
        get: function() {
          return this.$parent ? this.$parent.$dzhyunData : null;
        },
        set: function(value) {
          Object.defineProperties(this, {
            $dzhyunData: {
              writable: true,
              value
            }
          });
        },
      }
    });
  },

  getInstance(options) {
    return new Dzhyun(options);
  },
}
