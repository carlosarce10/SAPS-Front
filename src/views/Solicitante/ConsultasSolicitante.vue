<template>
  <div class="row">
    <div>
      <HeaderSolicitante />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">
            Consultas
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
                <th scope="col">División</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer class="fixed-bottom" />
  </div>
</template>

<script>
import HeaderSolicitante from "../../components/HeaderSolicitante.vue";
import Footer from "../../components/Footer.vue";
//import api from '../../util/api';
export default {
  components: {
    HeaderSolicitante,
    Footer,
  },
  data() {
    return {};
  },
  beforeMount() {},
  methods: {},
};
</script>

<style scoped>
.perfil {
  background: #00ab84;
  color: white;
}
</style>
