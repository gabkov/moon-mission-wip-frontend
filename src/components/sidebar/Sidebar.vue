<template>
  <div class="sidebar" :style="this.menuOpen ? {width: '0px', padding: 0}: {width: '180px'}">
    <div v-if="!menuOpen">
      <SidebarLink :menuOpen="this.menuOpen" to="/" icon="fas fa-home">Home</SidebarLink>
      <SidebarLink :menuOpen="this.menuOpen" to="/pre-sale" icon="fas fa-columns">Pre-sale</SidebarLink>
      <SidebarLink :menuOpen="this.menuOpen" to="/farms" icon="fas fa-chart-bar">Farms</SidebarLink>
      <SidebarLink :menuOpen="this.menuOpen" to="/friends" icon="fas fa-users">Friends</SidebarLink>
      <SidebarLink :menuOpen="this.menuOpen" to="/image" icon="fas fa-image">Images</SidebarLink>
    </div>

    <span class="collapse-icon" :class="{ 'rotate-180': menuOpen }" @click="$emit('toggle-menu')">
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink'

export default {
  props: {
    menuOpen: Boolean
  },
  components: { SidebarLink },
}
</script>

<style>
:root {
  --sidebar-bg-color: #212529;
  --sidebar-item-hover: #909090;
  --sidebar-item-active: #495057;;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
  color: #212529
}
</style>