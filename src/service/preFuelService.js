import Moralis  from "../plugins/moralis"   
import preFuel from "../abi/PreFuelToken.json"


async function maxPurchaseAmount() {
    const options = {
        contractAddress: "0x586b526fc95f1dC9C5E1E14d6E2217faa4B3Bca7",
        functionName: "maxPreFuelPurchase",
        abi: preFuel
    }
        
    console.log("called before")

    return await Moralis.executeFunction(options)
}
export {
    maxPurchaseAmount
};
