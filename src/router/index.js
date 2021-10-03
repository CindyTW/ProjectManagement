import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import AddProject from "../views/AddProject.vue";
import EditProject from "../views/EditProject.vue";
import AddTask from "../views/AddProject.vue";
import ManageProject from "../views/ManageProject";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/addProject",
    name: "AddProject",
    component: AddProject,
  },
  {
    path: "/projects/:id",
    name: "EditProject",
    component: EditProject,
    props: true,
  },
  {
    path: "/addTask",
    name: "AddTask",
    component: AddTask,
  },
  {
    path: "/manageproject/:id",
    name: "ManageProject",
    component: ManageProject,
    props: true,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
