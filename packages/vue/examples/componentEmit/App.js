import { h } from '../../dist/mugua-mini-vue3.esm.js';
import { Foo } from './Foo.js';

export const App = {
  name: 'App',
  render() {
    // emit
    return h('div', {}, [h('div', {}, 'App'), h(Foo, {
      onAdd(a, b) {
        console.log('onAdd', a, b)
      },
      //add-foo -> addFoo
      onAddFoo() {
        console.log('onAddFoo')
      }
    })]);
  },

  setup() {
    return {};
  },
};
