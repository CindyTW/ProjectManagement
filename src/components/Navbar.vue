<template>
<header class="header">
 <img src="../assets/logo.svg" width="700" height="70" class="logo"> 
  <nav class="main-nav">
   <router-link :to="{ name: 'Home' }"><strong>首頁</strong></router-link>
   <router-link :to="{ name: 'Login' }"><strong>登入</strong></router-link> 
  </nav>
</header>
</template>

<script>
export default {

};
</script>

<style >
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto 25px;
  padding: 8px;
  background:rgb(84, 230, 181); 
}

.logo {
  margin-left: -200px;
}
.main-nav {
  text-align: center;
  margin-left: -300px;
 } 
 .main-nav button{
  border-radius: 8px;
  background-color: white;
  margin: 0 10px;
  border: none;
  padding: 10px;
 }
 .main-nav button:hover{
  background-color: #00ce89;
  color: white;
 }
.main-nav a {
  display: inline-block;
  text-decoration: none;
  margin: 0px 10px;
  color: rgb(0, 17, 173);
  font-size: 22px;
  outline:none;
}
.main-nav a:hover {
  color: rgb(255,255,255);
  /* border-bottom: 2px solid rgb(255,255,255); */
  background: rgb(25, 47, 245);
  border-radius: 10px;
  padding: 5px 10px;
  outline:none;
}
a.router-link-active {
  border-bottom: 2px solid rgb(0, 17, 173);
  padding-bottom: 4px; 
}
</style>