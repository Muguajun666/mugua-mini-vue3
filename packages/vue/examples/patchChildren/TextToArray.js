import { h, ref } from '../../dist/mugua-mini-vue3.esm.js';

const nextChildren = [h('div', {}, 'A'), h('div', {}, 'B')]
const prevChildren = 'oldChildren'

export default {
  name: 'TextToArray',
  setup() {
    const isChange = ref(false)
    window.isChange = isChange

    return {
      isChange
    }
  },
  render() {
    const self = this
    return self.isChange === true ? h('div', {}, nextChildren) : h('div', {}, prevChildren)
  },
};
