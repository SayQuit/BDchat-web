<template>
    <div class="bgr">
      <div class="center">
          <div class="header">
              <div class="header-name"><img src="../assets/login.png"><div>登录</div></div>
          </div>
          <div class="info">
              <div class="info-name">
                  <div class="info-name-title">账号</div>
                  <input type="text">
              </div>
              <div class="info-psw">
                  <div class="info-psw-title">密码</div>
                  <input type="password">
              </div>

  
              <div class="operation">
                <el-button type="success" size="medium">注册</el-button>
                <el-button type="warning" size="medium">清空</el-button>
                <el-button type="danger" size="medium">返回</el-button>
              </div>
          </div>
      </div>
  
  

    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
      *{
          font-size: 28px;
      }
      .bgr{
          background: url('../assets/2.png') no-repeat;
          background-size: cover;
          width: 100%;
          height: 1080px;
      }
      .center{
          position: absolute;
          margin-top: 100px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 800px;
          border: 1px solid #999;
          background-color: white;
          border-radius: 10px;
      }
      .header{
          height: 150px;
          width: 100%;
          border-bottom: 1px solid #999;
      }
      .header-name{
          font-size: 40px;
          color: #444;
          padding-top: 50px;
      }
      .header-name img{
          height: 40px;
          color: #444;
          vertical-align: middle;
          display: inline-block;
          margin-left: 280px;
      }
      .header-name div{
          display: inline-block;
          margin-left: 50px;
      }
      .info{
          margin-top: 120px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
      
          
          
      }
      .info div{
          display: inline-block;
      }
      .info>div>div{
          margin-right: 30px;
          line-height: 60px;
      }
      .info>div{
          margin-bottom: 30px;
          width: 450px;
          height: 60px;
          display: inline-block;
      }
      .info input{
          /* display: inline-block; */
          width: 280px;
          height: 60px;
          border: 1px solid #999;
          float: right;
          border-radius: 10px;
          outline: none;
          padding: 0 10px;
      }
  
      .info>.operation{
        margin: 0 auto;
          margin-top: 150px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: auto;
          
      }
      .operation>.el-button{
        
          font-size:16px;
          
          
      }
  </style>