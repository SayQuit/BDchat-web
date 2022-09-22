<template>
  <div>


    
    
    <!-- <RegisterPage></RegisterPage> -->
    <!-- <NotLogin></NotLogin> -->
    <!-- <LoginPage></LoginPage> -->
    <!-- <NotLogin></NotLogin> -->
    <AccountManage></AccountManage>
  </div>
</template>

<script>
// import NotLogin from './NotLogin.vue';
import axios from 'axios';
import AccountManage from './AccountManage.vue';
// import NotLogin from './NotLogin.vue';
// import RegisterPage from './RegisterPage.vue';
export default {
    components: {
    AccountManage
},
    methods: {
        handleLogin(){
            axios
            .post("")
            .then((data)=>{
                console.log(data);
            })
        }
    },
}
</script>

<style scoped>
    .log{
        width: 100%;
        height: 50px;
        margin-top: 15px;
    }
    .log>.login{
        display: inline-block;
        margin-left: 10px;
    }
</style>