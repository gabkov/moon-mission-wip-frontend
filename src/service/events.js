import {preFuelBalanceOf} from "./preFuelService"
import {busdBalanceOf} from "./busdService"
import { preFuelContract, busdContract } from "./contracts";
import store from '../store'
import {PRE_FUEL_TOKEN_CONTRACT} from "../consts/constants"


 // EVENTS
 preFuelContract.on("PreFuelPurchased", (from, to, boughtAmount) => {
    console.log(`${boughtAmount} pre fuel purchased by ${from} for ${to} BUSD`);
  
    if(store.state.user.get('ethAddress') === from.toLowerCase()){
      preFuelBalanceOf(from)
      .then(newBalance => store.setUserPreFuelBalance(newBalance))
  
      busdBalanceOf(from)
      .then(newBalance => store.setUserBusdBalance(newBalance))
    }
  });


busdContract.on("Approval", (owner, spender, value) => {
  console.log(`${owner} approved ${spender} to spend ${value} BUSD`)
  if(store.state.user.get('ethAddress') === owner.toLowerCase() || spender === PRE_FUEL_TOKEN_CONTRACT){
    store.setUserApprovedBusd(true)
  }
});
