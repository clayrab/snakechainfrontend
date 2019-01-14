export let makeRetry = function(){
  let timeouts = [];
  let cleanup = () => {
    console.log("cleanup")
    console.log(timeouts)
    for(let i = 0; i < timeouts.length; i++) {
      console.log(timeouts[i])
      clearTimeout(timeouts[i]);
    }
  }
  let retry = async (interval, prom) => {
    return await new Promise(async(resolve, reject) => {
      try {
        let result = await prom();
        console.log("result")
        //console.log(result)
        cleanup();
        resolve(result);
      } catch(err) {
        console.log("reject")
        console.log(err)
        // cleanup();
        // reject(err);
      }
      timeouts.push(setTimeout(async() => {
        try {
          let result = await retry(interval*1.3, prom);
          console.log("result2")
          cleanup();
          resolve(result);
        } catch(err) {
          console.log("reject2")
            console.log(err)
          // cleanup();
          // reject(err);
        }
      }, interval));
    }).catch((err) => {
      throw err;
    });
  }
  return retry;
}

// let timeouts = [];
// let cleanup = () => {
//   console.log("cleanup")
//   console.log(timeouts)
//   for(let i = 0; i < timeouts.length; i++) {
//     console.log(timeouts[i])
//     cancelTimout(timeouts[i]);
//   }
// }
// // export let retry = async (interval, prom) => {
// //   return await new Promise(async(resolve, reject) => {
// //     try {
// //       let result = await prom();
// //       console.log("result")
// //       //console.log(result)
// //       cleanup();
// //       resolve(result);
// //     } catch(err) {
// //       console.log("reject")
// //       cleanup();
// //       reject(err);
// //     }
// //     timeouts.push(setTimeout(async() => {
// //       try {
// //         let result = await retry(interval*1.3, prom);
// //         console.log("result2")
// //         cleanup();
// //         resolve(result);
// //       } catch(err) {
// //         console.log("reject2")
// //         cleanup();
// //         reject(err);
// //       }
// //     }, interval));
// //   }).catch((err) => {
// //     throw err;
// //   });
// // }
