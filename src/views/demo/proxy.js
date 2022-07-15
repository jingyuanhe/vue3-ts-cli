let activeReactiveFn = null;
const targetMap = new Map();
class Depend {
  constructor() {
    this.reactiveFns = new Set();
  }
  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn);
    }
  }
  notify() {
    this.reactiveFns.forEach((fn) => {
      fn();
    });
  }
}
function getDepend(target, key) {
  let map = targetMap.get(target);
  if (!map) {
    map = new Map();
    targetMap.set(target, map);
  }
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}
function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}
function reactive(obj) {
  return new Proxy(obj, {
    get: function (target, key, receiver) {
      const depend = getDepend(target, key);
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, newValue, receiver) {
      const depend = getDepend(target, key);
      depend.notify();
      Reflect.set(target, key, newValue, receiver);
    },
  });
}
let objProxy = reactive({
  name: 'demo',
});
objProxy.name = 'ceshi';
watchFn(function () {
  console.log(objProxy.name);
});
