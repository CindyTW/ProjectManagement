<template>
    <div class="right-nav">
      <input class="search-bar" type="text" placeholder="專案名稱" v-model="project" @keypress="search(project)">
      <button class="btn-search" @click="search(project)">搜尋</button> 
    </div>
</template>
<script>
import { db } from '../../data/db.json'
export default {
    components:{ db },
    data(){
        return{
            filteredList: null,
            projects:db,
            str:'',
            type:''
        }
    },
    computed:{
        resultList(){
           if(this.filteredList){
               return this.projects.filter(item=>{
                   return this.filteredList.toLowerCase().includes(item.toLowerCase())
               })
           } 
            }
        }
    }
    // methods:{
        // filterProjects(proName){
        //     this.resetProjects()
        //     if(proName !== 'All') {
        //         this.projects = this.projects.filter(project => {
        //             return project.title = proName
        //         })
        //     }
        // },
        //  resetProjects() {
        //     this.projects = db
        // }
 
</script>

<style>
.right-nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 25%;
}
.search-bar{
  border: 1px solid rgb(182, 182, 182);
  border-radius: 10px;
}
.right-nav .btn-search {
  background:#00ce89;
  color: white;
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
</style>