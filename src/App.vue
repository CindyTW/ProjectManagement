<template>
  <Navbar />
  <router-view></router-view>
</template>

<script>
// import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar.vue";

export default {
  components: { Navbar },
  name: "app",
};
</script>

<style>
body {
  background: #f2f2f2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1200px;
  margin: 0 auto;
  color: #555;
}
h2 {
  text-align: center;
  color: rgb(129, 129, 129);
}
*:focus {
  outline-color: #00ce89;
}
</style>

