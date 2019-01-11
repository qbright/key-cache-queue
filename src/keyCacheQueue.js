class KeyCacheQueue {
  constructor() {
    this.cache = {};
    this.keyLock = {};
    this.keyLockDef = {};
    this.keyResolveSet = {};
  }
  /**
   *
   * @param {*} key //作为查询计算的唯一标识，认为相同key调用函数将返回相同的结果
   * @param {*} fn(callback) //执行的函数， callback为函数执行完调用的的回调函数，可将返回值传入
   * @param {*} force  //忽略缓存，所有查询计算都执行
   */
  push(key, fn, force) {
    return new Promise((resolve, reject) => {
      try {
        if (force) {
          this.execFn(fn, key, force, resolve);
          //无视缓存
        } else {
          if (this.cache[key]) {
            resolve(this.cache[key]);
          } else {
            this.initKeyResolveSetIfNeed(key);
            this.keyResolveSet[key].push(resolve);
            if (!this.keyLock[key]) {
              //没有锁住，需要调用函数进行查询
              this.keyLock[key] = true;
              this.execFn(fn, key);
            } //如果是锁住的，则无需操作，promise 的resolve 函数已经存进去 keyResolveSet 了
          }
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  execFn(fn, key, force, resolve) {
    try {
      fn(result => {
        this.cache[key] = result;
        if (force) {
          resolve(result);
        } else {
          let cpSet = Array.apply(null, this.keyResolveSet[key]);
          this.keyResolveSet[key] = [];
          cpSet.forEach(f => {
            f(result);
          });
          this.keyLock[key] = false;
        }
      });
    } catch (e) {
      throw e;
    }
  }

  initKeyResolveSetIfNeed(key) {
    !this.keyResolveSet[key] && (this.keyResolveSet[key] = []);
  }
}

export default KeyCacheQueue;
