<template>
  <div class="opacity-[0.98] fixed w-full flex items-center justify-between h-14 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg shadow-sky-500 border-b-2 border-gray-600 z-[1]">
    <div class="flex items-center justify-start pl-3 w-48 h-14">
      <svg v-if="!menuOpen" @click="$emit('toggle-menu')" viewBox="0 0 24 24" class="w-8 h-8 stroke-white fill-white hover:bg-slate-500 rounded-lg cursor-pointer" xmlns="http://www.w3.org/2000/svg"><path d="M4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7Z"></path></svg>
      <svg v-else @click="$emit('toggle-menu')" viewBox="0 0 24 24" class="w-8 h-8 stroke-white fill-white hover:bg-slate-500 rounded-lg cursor-pointer"  xmlns="http://www.w3.org/2000/svg" ><path d="M4 18H15C15.55 18 16 17.55 16 17C16 16.45 15.55 16 15 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H12C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H15C15.55 8 16 7.55 16 7C16 6.45 15.55 6 15 6H4C3.45 6 3 6.45 3 7ZM20.3 14.88L17.42 12L20.3 9.12C20.69 8.73 20.69 8.1 20.3 7.71C19.91 7.32 19.28 7.32 18.89 7.71L15.3 11.3C14.91 11.69 14.91 12.32 15.3 12.71L18.89 16.3C19.28 16.69 19.91 16.69 20.3 16.3C20.68 15.91 20.69 15.27 20.3 14.88Z"></path></svg>
    </div>
    <div class="max-w-fit max-h-fit" v-if="isAuthenticated">
          <button class="btn-primary whitespace-nowrap" @click="logout">{{ userAddress.substr(0,6) + '...' 
            + userAddress.substr(userAddress.length - 4, userAddress.length) }} Log out</button>
    </div>
    <div v-else>
        <button class="animate-pulse flex items-center justify-start md:justify-center btn-primary whitespace-nowrap" @click="login">Connect wallet</button>
    </div>
    
  </div>
</template>

<script>
import { computed } from 'vue'
import { mapGetters, useStore } from 'vuex'
import {loginUser, logoutUser} from "@/service/loginService"


export default {
  name: 'NavBar',
  props: {
    menuOpen: Boolean
  },
  computed: {
    ...mapGetters({
        user: "getUser",
        userAddress: "getUserAddress"
    })
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