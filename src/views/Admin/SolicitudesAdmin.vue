<template>
  <div class="row">
    <div>
      <HeaderAdmin />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">
            Mis solicitudes
          </h4>
        </div>
      </div>
    </div>
    <div class="container pt-2">
      <!-- Tabla de consultas -->
      <div class="row shadow rounded">
        <div class="col-12">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Estado</th>
                <th scope="col">Consultor solicitado</th>
                <th scope="col">Solicitante</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(solicitudes, item) in listaSolicitud"
                :key="solicitudes.idBitacoraSolicitud"
              >
                <th>{{ item + 1 }}</th>
                <td>{{ solicitudes.solicitud.fecha }}</td>
                <td>{{ solicitudes.solicitud.estado }}</td>
                <td>{{ solicitudes.solicitud.consultor.usuario.nombre + ' ' 
                    + solicitudes.solicitud.consultor.usuario.apellidoPaterno + ' '
                    + solicitudes.solicitud.consultor.usuario.apellidoMaterno}}</td>
                <td>{{ solicitudes.solicitud.solicitante.usuario.nombre + ' ' 
                    + solicitudes.solicitud.solicitante.usuario.apellidoPaterno + ' '
                    + solicitudes.solicitud.solicitante.usuario.apellidoMaterno}}</td>
              </tr>
            </tbody>
          </table>
          <div class="container" v-if="listaSolicitud.length < 1">
            <img
              src="../../assets/sinDatos.png"
              style="height: 80px; width: 80px"
              class="m-2"
            />
            <h3 class="mt-2">
              Lo sentimos, no hemos podido encontrar datos :(
            </h3>
          </div>
        </div>
      </div>
    </div>
    <Footer class="fixed-bottom" />
  </div>
</template>

<script>
import HeaderAdmin from "../../components/HeaderAdmin.vue";
import Footer from "../../components/Footer.vue";
import api from '../../util/api';
export default {
  components: {
    HeaderAdmin,
    Footer,
  },
  data() {
    return {
        listaSolicitud:[],
    };
  },
  beforeMount() {
      this.getSolicitudes();
  },
  methods: {
    getSolicitudes() {
      api
        .doGet('saps/bitacora/solicitud/getAll')
        .then((response) => (this.listaSolicitud = response.data))
        .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: 'Oops! Ha ocurrido un error en el servidor.',
              icon: 'error',
            });
          } else {
            this.$swal({
              title: 'Oops! Ha ocurrido un error en el servidor.',
              icon: 'error',
            });
          }
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped>
.perfil {
  background: #00ab84;
  color: white;
}
</style>