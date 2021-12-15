<template>
  <div class="row">
    <div>
      <HeaderAdmin />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">Bitacora de consultas</h4>
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
                <th scope="col">Consultor</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(consulta, item) in listaConsulta"
                :key="consulta.idBitacoraConsulta"
              >
                <th>{{ item + 1 }}</th>
                <td>{{ consulta.consulta.consultor.usuario.nombre +
                    " " +
                    consulta.consulta.consultor.usuario.apellidoPaterno +
                    " " +
                    consulta.consulta.consultor.usuario.apellidoMaterno}}</td>
                <td>{{ consulta.consulta.solicitud.fecha }}</td>
              </tr>
            </tbody>
          </table>
          <div class="container" v-if="listaConsulta.length < 1">
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
      listaConsulta: [],
    };
  },
  beforeMount() {
    this.getConsultas();
  },
  methods: {
    getConsultas() {
      api
        .doGet('saps/bitacora/consulta/getAll')
        .then((response) => (this.listaConsulta = response.data))
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
