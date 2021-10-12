<template>
<div class="container">
  <form @submit.prevent="handleSubmit">
    <h2>任務</h2>
    <label>名稱:</label>
    <input type="text" v-model="title" required />
    <label>內容:</label>
    <textarea v-model="details" required></textarea>
    <div class="label">
    <label>開始:</label>
    <input type="text" v-model="startDate" placeholder="2021/01/01" onfocus="(this.type='date')" required />
    <label>結束:</label>
    <input type="text" v-model="endDate" placeholder="2021/01/01" onfocus="(this.type='date')" required />
    </div>
    <button>新增任務</button>
  </form>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      title: "",
      details: "",
    };
  },
  methods: {
    handleSubmit() {
      let project = {
        title: this.title,
        details: this.details,
        complete: false,
      };
      console.log(project);
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      })
        .then(() => {
          this.$router.push("/projects");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>

</style>
