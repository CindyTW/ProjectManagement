<template>

<div class="filter-nav">
  <nav class="left-nav">
    <button @click="updateFilter('all')" :class="{ active: current === 'all' }">
      查看全部
    </button>
    <button
      @click="updateFilter('completed')"
      :class="{ active: current === 'completed' }"
    >
      已完成
    </button>
    <button
      @click="updateFilter('ongoing')"
      :class="{ active: current === 'ongoing' }"
    >
      進行中
    </button>
    </nav>  

     <!-- Search Bar -->
     <nav class="right-nav">
      <input class="search-bar" type="text" placeholder="專案名稱" v-model="search">
      <button class="btn-search" @click="search(project)">搜尋</button> 
    </nav>

    <div v-for="project in filteredProjects" :key="project.id">
      <h3 :project="project"> {{ project.title }}</h3>
    </div>

  <!-- Add Button -->   
  </div>
    <div class="btn-addProject">
      <router-link :to="{ name: 'AddProject' }"><strong>新增專案</strong></router-link>
    </div>
</template>

<script>
export default {
  props: ["current"],
  methods: {
    updateFilter(by) {
      this.$emit("filterChange", by);
    },
  },
};
</script>

<style>
.filter-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 100px;
}
.filter-nav button {
  background: none;
  border: none;
  color: #bbb;
  outline: none;
  font-size: 16px;
  text-transform: uppercase;
  margin-right: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
}
.filter-nav button.active {
  color: #555;
}
.left-nav button {
  border-radius: 8px;
  margin: 0 10px;
  border: none;
  padding: 10px;
}
.left-nav button:hover{
  background-color: #00ce89;
  color: white;
}
 .btn-addProject button a {
  text-decoration: none;
  background:#00ce89;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  width: 60px;
}
.right-nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width:35%;
}
.search-bar{
  border: 1px solid rgb(182, 182, 182);
  border-radius: 10px;
}
.right-nav .btn-search {
  border: 2px solid #00ce89;
  color: #00ce89;
  border-radius:10px;
  width:25%;
  margin:10px;
  padding: 6px 1px;
}
.btn-search:hover {
  background:#00ce89;
  color: white;
}
::placeholder {
  color:#bbb;
  font-size: 15px;
}
 .btn-addProject a {
  display: inline;
  float: right;
  margin: -78px 0px 0px 20px;
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