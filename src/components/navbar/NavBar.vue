<template>
    <nav class="navbar navbar-light bg-dark justify-content-between">
      <span class="collapse-icon" :class="{ 'rotate-180': !menuOpen }" @click="$emit('toggle-menu')">
        <i class="fas fa-angle-double-left" />
      </span>
        <div>
            <div v-if="isAuthenticated">
                 <button @click="logout">{{ user.get('ethAddress').substr(0,6) + '...' 
                    + user.get('ethAddress').substr(user.get('ethAddress').length - 4,user.get('ethAddress').length) }} Log out</button>
            </div>
            <div v-else>
                <button @click="login">Connect wallet</button>
            </div>
        </div>
    </nav>
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
.collapse-icon {
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>