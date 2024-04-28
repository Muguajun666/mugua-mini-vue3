import { h } from '../../lib/mugua-mini-vue3.esm.js';

window.self = null
export const App = {
  // render
  render() {
    window.self = this
    return h(
      'div', 
      { 
        id: 'root', 
        class: ['red', 'hard'] 
      }, 
      // setupState
      // this.$el
      // 使用proxy代理
      'hi, ' + this.msg
      //string
      // 'hi, mini-vue'
      //array
      // [h('p', {class: 'red'}, 'hi'), h('p', {class: 'blue'}, 'mini-vue')]
    );
  },

  setup() {
    // composition api
    return {
      msg: 'mini-vue3',
    };
  },
};
