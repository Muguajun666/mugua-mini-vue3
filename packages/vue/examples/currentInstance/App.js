import { h, getCurrentInstance } from '../../dist/mugua-mini-vue3.esm.js';
import { Foo } from './Foo.js';

export const App = {
  name: 'App',
  render() {
    return h('div', {}, [h('p', {}, 'currentInstance demo'), h(Foo)]);
  },

  setup() {
    const instance = getCurrentInstance()
    console.log('App', instance)
  },
};
