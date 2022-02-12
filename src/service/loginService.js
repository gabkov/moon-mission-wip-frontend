import Moralis from '../plugins/moralis'
import store from '../store'


const setUser = (payload) => store.commit('setUser', payload)
const setUserLoading = (payload) => store.commit('setUserLoading', payload)


async function loginUser(){
    setUserLoading(true)
    try {
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

export{
    loginUser,
    logoutUser
}
