# Key Cache Queue

### 使用场景

在相同的查询条件，计算条件 key 下面，如果业务中需要多次进行获取或者计算，那么我们一般会把的产生的结果缓存下来，在下次查询的时候直接使用，但是如果是遇到极短时间内产生大量查询，在第一次计算或者查询结果出来之前，是没有缓存的，还是会导致缓存失败，从而产生大量的计算或者查询。比如一个通过用户 id 获取用户详情的功能， 相同 id 的第一次用户请求可能还没有回来，同样 id 的请求由于找不到缓存，也已经发出去了，导致冗余请求的产生

KeyCacheQueue 就是用来解决这个问题的，使用方法如下：(具体可以查询 `./test/test.js`)

    ```javascript
        const keyCacheQueue = new KeyCacheQueue(); //初始化队列

        keyCacheQueue
            .push('key1', callback => {
            setTimeout(() => {
               console.log("calc or fetch data");
               callback(`result-${key}`);
             }, 2000);
         }).then(res => {
        cb(res);
      });
    // 将key，function等参数填入

    ```
