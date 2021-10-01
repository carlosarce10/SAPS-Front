import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import Registro from '../views/Registro.vue';
import InicioAdmin from '../views/Admin/InicioAdmin.vue';
import InicioSolicitante from '../views/Solicitante/InicioSolicitante.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/registro",
        name: "Registro",
        component:  Registro
    },
    {
        path: "/administrador/inicio",
        name: "InicioAdmin",
        component: InicioAdmin
    },
    {
        path: "/solicitante/inicio",
        name: "InicioSolicitante",
        component:  InicioSolicitante
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

  export default router;