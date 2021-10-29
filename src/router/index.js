import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import Registro from '../views/Registro.vue';
import InicioAdmin from '../views/Admin/InicioAdmin.vue';
import GestionSintomas from '../views/Admin/GestionSintomas.vue';
import GestionNiveles from '../views/Admin/GestionNiveles.vue';
import GestionCarreras from '../views/Admin/GestionCarreras.vue';
import GestionDivisiones from '../views/Admin/GestionDivisiones.vue';
import GestionAdtvo from '../views/Admin/GestionUnidadesAdtvo.vue';
import GestionMotivos from '../views/Admin/GestionMotivos.vue';
import InicioSolicitante from '../views/Solicitante/InicioSolicitante.vue'
import GestionConsultores from '../views/Admin/GestionConsultores.vue';

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
        component: InicioAdmin,
        //meta: { roles: ["ROLE_ADMIN"] },
    },
    {
        path: "/administrador/gestionSitomas",
        name: "GestionSintomas",
        component: GestionSintomas,
       // meta: { roles: ["ROLE_ADMIN"] },
    },
    {
        path: "/administrador/gestionNiveles",
        name: "GestionNiveles",
        component: GestionNiveles,
        meta: { roles: ["ROLE_ADMIN"] },
    },
    {
        path: "/administrador/gestionCarreras",
        name: "GestionCarreras",
        component: GestionCarreras,
        meta: { roles: ["ROLE_ADMIN"] },
    },
    {
        path: "/administrador/gestionDivisiones",
        name: "GestionDivisiones",
        component: GestionDivisiones,
        meta: { roles: ["ROLE_ADMIN"] },
    },
    {
        path: "/administrador/gestionUnidadAdtvo",
        name: "GestionAdtvo",
        component: GestionAdtvo,
        meta: { roles: ["ROLE_ADMIN"] },
    },
    {
        path: "/administrador/gestionMotivos",
        name: "GestionMotivos",
        component: GestionMotivos,
        //meta: { roles: ["ROLE_ADMIN"] },
    },
    {
        path: "/solicitante/inicio",
        name: "InicioSolicitante",
        component:  InicioSolicitante,
       // meta: { roles: ["ROLE_SOLICITANTE"] },
    },    
    {
        path: "/administrador/gestionConsultores",
        name: "GestionConsultores",
        component: GestionConsultores,
        //meta: { roles: ["ROLE_ADMIN"] },
    },
]


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    let rol = localStorage.getItem("authority");
    let hasPermission = false;
    if (!to.meta.roles) return next();
    to.meta.roles.forEach((element) => {
      if (element == rol) {
        hasPermission = true;
      }
    });
  
    if (hasPermission) {
      next();
    } else {
      next("/");
    }
  });

  export default router;