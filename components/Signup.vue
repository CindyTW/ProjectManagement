<template>
  <form @submit.prevent="handleSubmit" class="signup-form">
      <input type="text" required placeholder="姓名" v-model="userName">
      <input type="email" required placeholder="電郵" v-model="email">
      <input type="password" required placeholder="密碼" v-model="password">
      <p></p>
      <button>註冊</button>
  </form>
</template>

<script>
import projectAuth from '../firebase/config';
export default {
    data(){
        return{
            userName:'',
            email:'',
            password:''
        }
    },
    methods:{
        handleSubmit() {
            projectAuth.createUserWithEmailAndPassword(this.email, this.password)
            .then(() =>{
                alert('註冊成功!');
                this.$router.push('/login');
            })
            .catch(error =>{
                alert('無法完成註冊');
            });
        }
      }
    }
</script>
<style scoped>
.signup-form {
    margin: 80px auto;
    width: 400px;
    border-radius: 10px;
    box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.2);
    font-size: 20px;  
    text-align: center;
    padding: 20px 0;
}
  /* form styles */ 
.signup-form input {
  width: 70%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}   
.signup-form span{
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
::placeholder{
    color: rgb(185, 184, 184);
}
</style>