export let makeRetry = function (_name) {
  let name = _name;
  let timeouts = [];
  let failureCount = 3;
  let cleanup = () => {
    for (let i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
  }
  let retry = async (interval, prom) => {
    //console.log("def retry " + name + "*********")
    return await new Promise(async (resolve, reject) => {
      //console.log("timeouts.push " + name + "*********")
      timeouts.push(setTimeout(async () => {
        try {
          let result = await retry(interval * 1.3, prom);
          console.log("result2")
          cleanup();
          resolve(result);
        } catch (err) {
          failureCount--;
          if (failureCount < 0) {
            cleanup();
            reject(err);
          }
        }
      }, interval));
      try {
        let result = await prom();
        cleanup();
        resolve(result);
      } catch (err) {
        failureCount--;
        if (failureCount < 0) {
          cleanup();
          reject(err);
        }
      }

    }).catch((err) => {
      throw err;
    });
  }
  return retry;
}
