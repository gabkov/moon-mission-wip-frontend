<template>
  <Sidebar @toggle-menu="toggleMenu" :menuOpen="this.menuOpen" />
  <NavBar @toggle-menu="toggleMenu" />
  <div class="container-fluid">
    <router-view />
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar";
import NavBar from "./components/navbar/NavBar";

export default {
  name: "App",
  components: {
    Sidebar,
    NavBar,
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
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
