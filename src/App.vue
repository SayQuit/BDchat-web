<template>
  <div>
    <NotLogin></NotLogin>
  </div>
</template>

<script>
import NotLogin from './components/NotLogin.vue';


export default {
  name: 'App',
  components: {
    NotLogin
}
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  min-width: 1600px;
  min-height: 900px;
  max-width: 2560px; 
  margin: 0 auto;
}
</style>
