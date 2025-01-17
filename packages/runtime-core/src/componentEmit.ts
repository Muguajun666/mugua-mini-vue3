import { camelize, toHandlerKey } from "@mugua-mini-vue3/shared"

export function emit(instance, event, ...args) {
  console.log('emit', event)

  const { props } = instance
  // TPP 
  // 先写一个特定行为 => 重构成通用行为
  // add -> Add
  // add-foo -> addFoo

  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]
  handler && handler(...args)
}