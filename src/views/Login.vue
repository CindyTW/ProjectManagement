<template>
<div class="form">
    <div v-if="showLogin">
      <h2>Login</h2>
      <Login />
      <p>還沒註冊嗎?請按此處<span @click="showLogin = false">註冊</span></p>
    </div>
    <div v-else>
      <h2>Sign up</h2>
      <Signup />
      <p>已經註冊了?請按此處<span @click="showLogin = true">登入</span></p>
    </div>   
</div>
</template>

<script>
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
export default {
    components: { Login, Signup},
  data(){
    return{
      showLogin: true
    }
  }
}
</script>
<style>
.form {
    margin: 40px auto;
    width: 400px;
    text-align: center;
    padding: 20px 0;
    font-size: 20px;
}
.form span{
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  color: #51d3bb;
}
.form p{
  font-size: 18px;
}
</style>