import Moralis from '../plugins/moralis'
import store from '../store'


const NETWORK_ID = "0x" + store.state.chainId.toString(16)

const setUser = (payload) => store.commit('setUser', payload)
const setUserLoading = (payload) => store.commit('setUserLoading', payload)


async function loginUser(){
    setUserLoading(true)
    try {
        await Moralis.enableWeb3();
        const chainId = await Moralis.chainId;
        if(chainId !== NETWORK_ID){
            try {
                await Moralis.switchNetwork(NETWORK_ID);
            } catch (error) {
                await addNetwork()
                await Moralis.switchNetwork(NETWORK_ID);
            }
        }
        await Moralis.authenticate().then(user => setUser(user))
    } catch (error) {
        setUserLoading(false)
        return
    }
    location.reload()
}

async function logoutUser(){
    Moralis.User.logOut().then(() => setUser({}))
    location.reload()
}

async function addNetwork(){
    const chainName = "BSC TestNet"
    const rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/"
    const chainId = store.state.chainId
    const currencyName = "Binance Coin";
    const currencySymbol = "BNB"
    const blockExplorerUrl = "https://testnet.bscscan.com"
    await Moralis.addNetwork(chainId, chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl);
}

export{
    loginUser,
    logoutUser
}
