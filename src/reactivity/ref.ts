import { hasChanged, isObject } from "../shared"
import { trackEffects, trigggerEffects, isTracking } from "./effect"
import { reactive } from "./reactive"

export const enum RefFlags {
  IS_REF = "__v_isRef",
}


class RefImpl{
  private _value: any
  private _rawValue: any
  public dep
  public __v_isRef = true
  constructor(value) {
    this._rawValue = value
    // value如果为对象 => reactive
    this._value = convert(value)

    this.dep = new Set()
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    // 对比的时候 如果是对象 this._value当前是Proxy 用最开始的值去处理
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue
      this._value = convert(newValue)
      trigggerEffects(this.dep)
    }

  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}

export function ref (value) {
  return new RefImpl(value)
}

export function isRef (ref) {
  return !!ref.__v_isRef
}

export function unRef (ref) {
  return isRef(ref) ? ref.value : ref
}

export function proxyRefs (objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      return unRef(Reflect.get(target, key))
    },

    set(target ,key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value)
      } else {
        return Reflect.set(target, key, value)
      }
    }
  })
}