import { fuelReedemContract } from "./contracts";



async function swapPreFuelForFuel(){
    await fuelReedemContract.swapPreFuelForFuel()
}


export{
    swapPreFuelForFuel
}