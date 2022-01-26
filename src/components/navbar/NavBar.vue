<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid justify-content-end">
            <div v-if="isAuthenticated">
                {{ user.get('ethAddress') }} <button @click="logout">Logout</button>
            </div>
            <div v-else>
                <button @click="login">Connect wallet</button>
            </div>
        </div>
    </nav>
</template>

<script>
import { onMounted, inject, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'NavBar',
  setup() {
    const store = useStore()
    const $moralis = inject('$moralis')

    const setUser = (payload) => store.commit('setUser', payload)
    
    const login = async () => {
      const user = await $moralis.Web3.authenticate()
      setUser(user)
    }

    const logout = async () => {
      await $moralis.User.logOut()
      setUser({})
    }

    const handleCurrentUser = () => {
      const user = $moralis.User.current()
      if (user) {
        setUser(user)
      }
    }

    onMounted(() => {
      handleCurrentUser()
    })

    return {
      login,
      logout,
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
      user: computed(() => store.state.user)
    }
  }
}
</script>