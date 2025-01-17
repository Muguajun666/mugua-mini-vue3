import { h, renderSlots } from '../../dist/mugua-mini-vue3.esm.js';

export const Foo = {
  setup() {
    return {};
  },
  render() {
    const foo = h('p', {}, 'foo');
    // Foo.vnode.children
    console.log(this.$slots);

    // renderSlots
    // 具名插槽
    // 作用域插槽
    const age = 18;
    return h('div', {}, [
      renderSlots(this.$slots, 'header', { age }),
      foo,
      renderSlots(this.$slots, 'footer'),
    ]);
  },
};
