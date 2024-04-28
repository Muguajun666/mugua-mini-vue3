import { render } from "./renderer";
import { createVNode } from "./vnode"

export function createApp (rootComponent) {
  return {
    mount(rootContainer) {
      // component => vnode
      // 所有操作 基于 vnode 处理

      const vnode = createVNode(rootComponent)

      render(vnode, rootContainer);
    }
  }
}

