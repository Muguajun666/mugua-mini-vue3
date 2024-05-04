import { reactive } from "../src/reactive"
import { computed } from "../src/computed"
import { describe, expect, it, vi } from "vitest"

describe('computed', () => {
  it('happy path', () => {
    // ref
    //.value
    // 缓存
    const user = reactive({
      age: 1
    })
    const age = computed(() => {
      return user.age
    })
    expect(age.value).toBe(1)
  })

  it('should compute lazily', () => {
    const value = reactive({
      foo: 1
    })

    const getter = vi.fn(() => {
      return value.foo
    })

    const cValue = computed(getter)

    // lazy cValue没被访问 getter不执行
    expect(getter).not.toHaveBeenCalled()

    // 访问1次调用一次
    expect(cValue.value).toBe(1)
    expect(getter).toHaveBeenCalledTimes(1)

    // // // 不该重复计算 实现缓存
    cValue.value // get
    expect(getter).toHaveBeenCalledTimes(1)

    // // // 依赖项变化时不会立即引起computed计算 只有当访问时才会触发getter
    value.foo = 2
    expect(getter).toHaveBeenCalledTimes(1)

    // 现在变动
    expect(cValue.value).toBe(2)
    expect(getter).toHaveBeenCalledTimes(2)

    cValue.value // get
    expect(getter).toHaveBeenCalledTimes(2)

  })
})