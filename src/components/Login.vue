<template>
  <form @submit.prevent="handleSubmit" class="login-form">
      <h2></h2>
      <input type="text" required placeholder="姓名" v-model="userName">
      <input type="password" required placeholder="密碼" v-model="password">
      <p><button>登入</button></p>
  </form>
</template>

<script>
export default {
    data(){
        return{
            userName:'',
            password:'',
            
        }
    },
    methods:{
        handleSubmit() {
           this.email = email.value
           this.password = password.value
        }
    }
}
</script>
<style scoped>
h2 {
   margin: 40px auto;
}
.login-form {
    margin: 80px auto;
    width: 400px;
    border-radius: 10px;
    box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.2);
    font-size: 20px;  
    text-align: center;
    padding: 20px 0;
}
  /* form styles */ 
.login-form input{
  width: 70%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}   
::placeholder{
    color: rgb(185, 184, 184);
}
</style>