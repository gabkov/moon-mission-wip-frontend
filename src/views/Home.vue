<template>
  <div>
    <h1>This is the home page</h1>

     <Modal :showModal="false"/> 
  </div>
</template>

<script>
import Modal from '../components/modal/Modal.vue'

export default {
  components:{
    Modal
  }
}
</script>