import { extend } from "@mugua-mini-vue3/shared"

let activeEffect
let shouldTrack

export class ReactiveEffect {
  private _fn: any
  deps = []
  active = true //判断是否被清理
  onStop?: () => void
  public scheduler: Function | undefined
  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }
  run() {
    // 1.会收集依赖
    // 利用shouldTrack区分
    if (!this.active) {
      return this._fn()
    }

    shouldTrack = true
    activeEffect = this

    const result = this._fn()

    shouldTrack = false

    return result

  }
  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
  effect.deps.length = 0
}

const targetMap = new Map()
export function track(target, key) {
  if (!isTracking()) return
  // target -> key -> dep
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  trackEffects(dep)
}

export function trackEffects(dep) {
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

export function effect(fn, options:any = {}) {
  // fn
  const _effect = new ReactiveEffect(fn, options.scheduler)
  
  extend(_effect, options)

  _effect.run()

  const runner: any = _effect.run.bind(_effect)

  runner.effect = _effect

  return runner
}

export function triggger (target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  
  trigggerEffects(dep)
}

export function trigggerEffects (dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function stop (runner) {
  runner.effect.stop()
}
