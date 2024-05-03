import { h } from '../../lib/mugua-mini-vue3.esm.js';
export default {
  name: 'Child',
  setup(props, { emit }) {},
  render(proxy) {
    return h('div', {}, [
      h('div', {}, 'child - props - msg: ' + this.$props.msg),
    ]);
  },
};
