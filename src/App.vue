<template>
  <div>
    <MainPage></MainPage>
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue';
  


export default {
  name: 'App',
  components: {
    MainPage
}
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  min-height: 900px;
  max-width: 2800px; 
  margin: 0 auto;
}
html{
  margin: 0;
}
body{
  margin: 0;
}
</style>
