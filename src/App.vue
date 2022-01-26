<template>
<Sidebar />
<NavBar />
<div :style="{ 'margin-left': sidebarWidth }">
  <router-view />
</div>
</template>

<script>

import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'
import NavBar from './components/navbar/NavBar'
import { inject } from 'vue'
import { useStore } from 'vuex'


export default {
  name: 'App',
  components: {
    Sidebar, 
    NavBar
  },
  setup(){
    const store = useStore()
    const moralis = inject('$moralis')
    moralis.enableWeb3()
    const currentUser = moralis.User.current();
    if (currentUser) {
        store.commit('setUser', currentUser)
    }
    return { sidebarWidth }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>