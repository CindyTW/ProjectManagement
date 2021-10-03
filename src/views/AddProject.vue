<template>
<div class="container">
  <form @submit.prevent="handleSubmit">
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
    <button>新增專案</button>
  </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      details: "",
      startDate: "",
      endDate: ""
    };
  },
  methods: {
    handleSubmit() {
      let project = {
        title: this.title,
        details: this.details,
        startDate: this.startDate,
        endDate: this.endDate,
        complete: false,
      };
      console.log(project);

      fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.container {
  width: 500px;
  margin: 80px auto;
}
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label, .label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
.label{
  display: flex;
  justify-content:start;
  align-items: center;
}
.label input{
  width: 40%;
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 90px;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
}
</style>