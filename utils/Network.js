import {context} from "../utils/Context.js";
export let doGetFetch = async function(url, jwt) {
  try{
    let headers = {
      "Content-Type": "application/json; charset=utf-8",
      //"Content-Type": "application/x-www-form-urlencoded",
    };
    if (jwt) {
      headers.Authorization = "JWT " + jwt;
    }
    let response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: headers,
    });
    if(response.status === 401) {
      throw "Unauthorized";
    }
    var resp = await response.json();
    if (resp.error) {
      throw resp.error;
    } else if (resp) {
      return resp
    }
  } catch(err){
    throw err
  }
}


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
