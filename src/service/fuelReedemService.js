import { fuelReedemContract } from "./contracts";



async function swapPreFuelForFuel(){
    const tx = await fuelReedemContract().swapPreFuelForFuel()
    
    const receipt = tx.wait()
    return receipt
}


export{
    swapPreFuelForFuel
}