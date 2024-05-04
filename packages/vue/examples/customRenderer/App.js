import { h } from '../../dist/mugua-mini-vue3.esm.js';

export const App = {
  name: 'App',
  render() {
    return h('rect', { x: this.x, y: this.y });
  },

  setup() {
    return {
      x: 100,
      y: 100,
    };
  },
};
