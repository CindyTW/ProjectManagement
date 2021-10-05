<template>
 
<div v-if="tasks.length">
   <div v-for="task in filteredTasks" :key="task.id">
    <div class="task" :class="{ complete: task.complete }">
     <div class="actions">
      <h3 @click="showDetails = !showDetails">任務: {{ task.name }}</h3>
      <div class="icons">
        <router-link :to="{ name: 'EditTask', params: { id: task.id } }">
          <span class="material-icons">edit</span>
        </router-link>
        <span @click="deleteTask" class="material-icons">delete</span>
        <span @click="toggleComplete" class="material-icons tick">done</span>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      <p>任務: {{ task.progress }}</p>
   </div>      
  </div>
</div>
</div>
</template>

<script>
export default {
    data() {
    return {
      tasks:[],
      showDetails: false,
      uri: "http://localhost:3000/projects/" + this.task.id,
    };
  },
  methods: {
    deleteProject() {
      fetch(this.uri, { method: "DELETE" })
        .then(() => this.$emit("delete", this.task.id))
        .catch((err) => console.log(err));
    },
    toggleComplete() {
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: !this.task.complete }),
      })
        .then(() => {
          this.$emit("complete", this.task.id);
        })
        .catch((err) => console.log(err));
    },
    filteredTasks() {
      if (this.current === "completed") {
        return this.tasks.filter((task) => task.complete);
      }
      if (this.current === "ongoing") {
        return this.tasks.filter((task) => !task.complete);
      }
      return this.task;
    }
  }
}
</script>

<style>
</style>