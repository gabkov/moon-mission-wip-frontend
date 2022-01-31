import Moralis from '../plugins/moralis'
import store from '../store'


const setUser = (payload) => store.commit('setUser', payload)


async function loginUser(){
    await Moralis.authenticate().then(user => setUser(user))
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
