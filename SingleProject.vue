<template>
  <div class="project" :class="{ complete: project.complete }">
    <div class="actions">
      <h3 @click="showDetails = !showDetails">專案: {{ project.title }}</h3>
      <div class="icons">
        <router-link :to="{ name: 'EditProject', params: { id: project.id } }">
          <span class="material-icons">edit</span>
        </router-link>
        <router-link :to="{ name: 'GanttChart', params: { id: project.id } }">
          <span class="material-icons">event_note</span>
        </router-link>
        <span @click="deleteProject" class="material-icons">delete</span>
        <span @click="toggleComplete" class="material-icons tick">done</span>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      <p>
        概要: {{ project.details }} <strong>‖</strong> 專案開始:{{
          project.dateStart
        }}
        ~ 專案結束: {{ project.dateEnd }}
      </p>
    </div>
    <button @click="redirect" class="btn">甘特圖</button
    ><button class="btn" @click="handleTask">新增任務</button>
  </div>

  <!-- <SingleTask /> -->
</template>

<script>
export default {
  props: ["project", "task"],
  data() {
    return {
      showDetails: false,
      uri: "http://localhost:3000/projects/" + this.project.id,
    };
  },
  methods: {
    deleteProject() {
      fetch(this.uri, { method: "DELETE" })
        .then(() => this.$emit("delete", this.project.id))
        .catch((err) => console.log(err));
    },
    toggleComplete() {
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: !this.project.complete }),
      })
        .then(() => {
          this.$emit("complete", this.project.id);
        })
        .catch((err) => console.log(err));
    },
    handleTask() {
      this.$router.push("/addtask");
    },
    redirect() {
      this.$router.push("/ganttchart/:id");
    },
  },
};
</script>

<style scoped>
.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 7px solid #e90074;
}
h3 {
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.material-icons:hover {
  color: #777;
}
.project.complete {
  border-left: 7px solid #00ce89;
}
.project.complete .tick {
  color: #00ce89;
}
.project button {
  border-radius: 8px;
  margin: 0 10px;
  border: none;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 8px;
}
.project button:hover {
  background: linear-gradient(to bottom, rgb(84, 230, 181), rgb(20, 163, 115));
  color: white;
  cursor: pointer;
}
</style>