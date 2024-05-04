// mini-vue3 出口
export * from '@mugua-mini-vue3/runtime-dom'

import { baseCompile } from '@mugua-mini-vue3/compiler-core'
import * as runtimeDom from '@mugua-mini-vue3/runtime-dom'
import { registerRuntimeCompiler } from '@mugua-mini-vue3/runtime-dom'

function compileToFunciton(template) {
  const { code } = baseCompile(template)
  const render = new Function('Vue', code)(runtimeDom)
  console.log(render, 'render')
  return render
}

registerRuntimeCompiler(compileToFunciton)