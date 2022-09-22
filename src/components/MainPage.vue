<template>
  <div>
    <div class="log">
        <el-button type="success" class="login" size="medium" @click="handleLogin">登录</el-button>
        <el-button type="primary" class="login" size="medium">注册</el-button>
        <el-button type="danger" class="login" size="medium">退出</el-button>
    </div>

    
    
    <RegisterPage></RegisterPage>
    <!-- <NotLogin></NotLogin> -->
  </div>
</template>

<script>
// import NotLogin from './NotLogin.vue';
import axios from 'axios';
import RegisterPage from './RegisterPage.vue';
export default {
    components: {
    RegisterPage
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

<style>
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