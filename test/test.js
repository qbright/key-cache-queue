//同个key会通过消耗资源的方法，比如大量计算，网络查询，返回同一个东西
//极短时间内会被连续调用，可能没有计算完成或者网络耗时，导致了无法简单的进行缓存(因为极短时间内缓存都为空)
//因此

//before

//没有优化的情况
const before = {
  caches: {},
  longTask(key, callback) {
    if (!caches[key]) {
      console.log(`calc or fetch data ${key}`);
      setTimeout(() => {
        caches[key] = `result-${key}`;
        callback(caches[key]);
      }, 2000);
    } else {
      callback(caches[key]);
    }
  },
  start() {
    this.longTask("key1", function(result) {
      console.log(result);
    });

    this.longTask("key1", function(result) {
      console.log(result);
    });

    this.longTask("key1", function(result) {
      console.log(result);
    });

    this.longTask("key1", function(result) {
      console.log(result);
    });

    this.longTask("key1", function(result) {
      console.log(result);
    });

    this.longTask("key1", function(result) {
      console.log(result);
    });

    this.longTask("key1", function(result) {
      console.log(result);
    });
  }
};

before.start();

//output

// calc or fetch data key1
// calc or fetch data key1
// calc or fetch data key1
// calc or fetch data key1
// calc or fetch data key1
// calc or fetch data key1
// calc or fetch data key2
//then.. after 2second
// result-key1
// result-key1
// result-key1
// result-key1
// result-key1
// result-key1
// result-key1

const keyCacheQueue = new KeyCacheQueue();

const after = {
  longTask(key, cb) {
    keyCacheQueue
      .push(key, callback => {
        setTimeout(() => {
          console.log("calc or fetch data");
          callback(`result-${key}`);
        }, 2000);
      })
      .then(res => {
        cb(res);
      });
  },
  start() {
    this.longTask("key1", function(result) {
      console.log(result);
    });

    this.longTask("key1", function(result) {
      console.log(result);
    });

    this.longTask("key1", function(result) {
      console.log(result);
    });

    this.longTask("key1", function(result) {
      console.log(result);
    });

    this.longTask(
      "key1",
      function(result) {
        console.log(result);
      },
      true
    );

    this.longTask(
      "key2",
      function(result) {
        console.log(result);
      },
      true
    );

    this.longTask(
      "key1",
      function(result) {
        console.log(result);
      },
      true
    );
  }
};

after.start();

//output

//calc or fetch data key1
//result-key1
//result-key1
//result-key1
//result-key1
//result-key1
//result-key1
//calc or fetch data key2
//result-key2
