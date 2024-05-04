import { readonly, isReadonly, isProxy } from "../src/reactive";
import { describe, expect, it, vi } from 'vitest'

describe('readonly', () => {
  it('happy path', () => {
    //not set
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);
    expect(isReadonly(wrapped)).toBe(true);
    expect(isReadonly(original)).toBe(false);
    expect(isReadonly(wrapped.bar)).toBe(true);
    expect(isReadonly(original.bar)).toBe(false);
    expect(isProxy(wrapped)).toBe(true)
    expect(wrapped.foo).toBe(1);
  });

  it('warn when call set', () => {
    // console.warn()
    // mock

    console.warn = vi.fn()

    const user = readonly({
      foo: 1
    })

    user.foo = 2
    expect(console.warn).toHaveBeenCalled()
  })
});
