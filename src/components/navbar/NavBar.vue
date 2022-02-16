<template>
  <div class="opacity-[0.98] fixed w-full flex items-center justify-between h-14 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg shadow-sky-500 border-b-2 border-gray-600 z-[1]">
    <div class="flex items-center justify-start md:justify-center pl-3 w-14 md:w-48 h-14">
      <img class="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden" src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg" />
      <span class="hidden md:block">ADMIN</span>
    </div>
    <div class="" v-if="isAuthenticated">
          <button class="btn-primary" @click="logout">{{ user.get('ethAddress').substr(0,6) + '...' 
            + user.get('ethAddress').substr(user.get('ethAddress').length - 4,user.get('ethAddress').length) }} Log out</button>
    </div>
    <div v-else>
        <button class="animate-pulse flex items-center justify-start md:justify-center btn-primary" @click="login">Connect wallet</button>
    </div>
    
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import {loginUser, logoutUser} from "@/service/loginService"


export default {
  name: 'NavBar',
  props: {
    menuOpen: Boolean
  },
  setup() {
    const store = useStore()
    
    const login = async () => {
      await loginUser()
    }

    const logout = async () => {
      await logoutUser()
    }

    return {
      login,
      logout,
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
      user: computed(() => store.state.user)
    }
  }
}
</script>

<style scoped>




</style>