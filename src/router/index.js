import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import Registro from '../views/Registro.vue';
import InicioAdmin from '../views/Admin/InicioAdmin.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/administrador/inicio",
        name: "InicioAdmin",
        component: InicioAdmin
    },
    {
        path: "/registro",
        name: "Registro",
        component:  Registro
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

  export default router;