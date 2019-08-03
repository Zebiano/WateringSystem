<template>
  <div class="about">
    <h1>This is an about page</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" ohye="huehue" />
  </div>
</template>

<script>
// Imports
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import config from "@/config";

export default {
  name: "about",
  components: {
    HelloWorld
  },
  mounted() {
    axios
      .get(config.api.method + config.api.host + ":" + config.api.port)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>
