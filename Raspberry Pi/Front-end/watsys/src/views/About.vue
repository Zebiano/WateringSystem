<template>
  <div class="about">
    <h1>This is an about page</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" ohye="huehue" />
  </div>
</template>

<script>
// Imports
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'about',
  components: {
    HelloWorld
  },
  mounted () {
    axios
      .get('http://localhost:3000')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>
