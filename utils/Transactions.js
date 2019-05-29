import {context} from "../utils/Context.js";

export let createTransaction = async (type, amount, jwt) => {
  return await new Promise((resolve, reject) => {
    let data = {
      amount: amount,
      type: type,
    };
    fetch(`${context.host}:${context.port}/createTransaction`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "JWT " + jwt,
      },
    }).then(async (response) => {
      let resp = await response.json();
      if (!resp.error) {
        if (resp) {
          if (resp.transactionKey) {
            resolve(resp.transactionKey);
          } else {
            reject("There was an error, malformed response.");
          }
        } else {
          reject("There was an error, no response.");
        }
      } else {
        reject(resp.error);
      }
    }).catch(err => {
      reject(err);
    })
  });
}
