<template>
    <div class="btn-addProject">
      <router-link :to="{ name: 'AddProject' }"><strong>新增專案</strong></router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style>

 .btn-addProject a {
  display: inline;
  float: right;
  /* margin: -78px 0px 0px 20px; */
  margin: -78px auto;
  background:linear-gradient(to bottom, rgb(84, 230, 181),rgb(20, 163, 115)); 
  color: white;
  padding: 13px 35px;
  border-radius: 15px;
  width: 70px;
  font-size: 17.5px;
  text-decoration: none;
  text-align: center;
}
</style>