<template>
  <div class="row">
    <div>
      <HeaderSolicitante />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">
            Mi Perfil
          </h4>
        </div>
      </div>
    </div>
    <div class="container pt-4">
      <div class="row">
        <div class="col-6">
          <h4>Carlos Eduardo Arce de la Torre</h4>
        </div>
        <div class="col-6">
          <h4>I20183TI126</h4>
        </div>
      </div>
    </div>
    <div class="container pt-2">
      <div class="row  shadow rounded">
        <div class="col-12 float-start">
          <h6 class="float-start pt-4">
            Información Académica
          </h6>
          <hr style="margin-top:5%" />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">División</label>
          <input type="text" class="form-control" required />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Grado</label>
          <input type="text" class="form-control" required />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Grupo</label>
          <input type="text" class="form-control" required />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Tutor</label>
          <input type="text" class="form-control" required />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Nivel Académico</label>
          <input type="text" class="form-control" required />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Estado Civil</label>
          <b-form-select
              v-model="estadoCivil"
              size="mb"
              class="form-select form-select-sm mt-3"
            >
              <option
                v-for="estado in listaEstadoCivil"
                v-bind:key="estado.estadoCivil"
                v-bind:value="estado.idEstadoCivil"
              >
                {{ estado.estadoCivil }}
              </option>
            </b-form-select>
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Otros datos</label>
          <input type="text" class="form-control" required />
        </div>
      </div>
    </div>
    <!-- <div class="  rounded container p-4">
      <div class="row">
        <div class="col 12">
          <h6>nombre:</h6>
        </div>
      </div>
      <div class="col-12">
        <a class=" text-muted" href="/registro">No estoy registrado</a>
      </div>
    </div> -->
    <Footer class="fixed-bottom" />
  </div>
</template>

<script>
import HeaderSolicitante from '../../components/HeaderSolicitante.vue';
import Footer from '../../components/Footer.vue';
import api from '../../util/api';
export default {
  components: {
    HeaderSolicitante,
    Footer,
  },
  data() {
    return {
      listaEstadoCivil:  [],
      estadoCivil: '',
    };
  },
  beforeMount() {
    this.getEstadoCivil();
  },
  methods: {
    getEstadoCivil() {
      api
        .doGet('saps/estadoCivil/getAll')
        .then((response) => (this.listaEstadoCivil = response.data))
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
