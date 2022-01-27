import {preFuelBalanceOf} from "./preFuelService"
import {busdBalanceOf} from "./busdService"
import { preFuelContract } from "./contracts";
import store from '../store'

 // EVENTS
 preFuelContract.on("PreFuelPurchased", (from, to, boughtAmount) => {
    console.log(`${boughtAmount} pre fuel purchased by ${from} for ${to} BUSD`);
  
    if(store.state.user.get('ethAddress') === from.toLowerCase()){
      preFuelBalanceOf(from)
      .then(newBalance => store.dispatch("setUserPreFuelBalanceAsync", newBalance))
  
      busdBalanceOf(from)
      .then(newBalance => store.dispatch("setUserBusdBalanceAsync", newBalance))
    }
  });

