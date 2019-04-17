import CONSTANTS from '../Constants.js';

export let formatToken = (amount, type) => {
  if(type === "ETH") {
    let amtEth = (amount / CONSTANTS.WEIPERETH).toPrecision(4);
    if(amtEth < 1.0){
      amtEth = amtEth.replace(/(0+)$/g, '')
    }
    if(amtEth.substr(-1) === "."){
      amtEth = amtEth.slice(0, -1);
    }
    return amtEth;
  } else {
    return amount;
  }
}
