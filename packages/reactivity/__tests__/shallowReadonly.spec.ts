import { describe, test, expect } from "vitest";
import { isReadonly, shallowReadonly } from "../src/reactive";

describe('shallowReadonly', () => {
  test('should not make non-reactive properties reactive', () => {
    const props = shallowReadonly({ n: { foo: 1 } });
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  });
});
