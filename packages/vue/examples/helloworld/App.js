import { h } from '../../dist/mugua-mini-vue3.esm.js';
import { Foo } from './Foo.js';

window.self = null
export const App = {
  name: 'App',
  // render
  render() {
    window.self = this
    return h(
      'div', 
      { 
        id: 'root', 
        class: ['red', 'hard'],
        onClick() {
          console.log('click')
        },
        onMousedown() {
          console.log('mousedown')
        }
      },
      [
        h('div', {}, 'hi,' + this.msg),
        h(Foo, {
          count : 1
        })
      ]
      // setupState
      // this.$el
      // 使用proxy代理
      // 'hi, ' + this.msg
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
