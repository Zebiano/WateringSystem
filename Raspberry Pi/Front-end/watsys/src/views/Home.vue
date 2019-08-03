<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" ohye="huehue" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "about",
  components: {
    HelloWorld
  }
};
</script>
