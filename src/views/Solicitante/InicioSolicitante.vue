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
          <h4>{{ this.nombre }} {{ this.apellidoP }} {{ this.apellidoM }}</h4>
        </div>
        <div class="col-6">
          <h4 v-if="this.tipoUsuario == 1">{{ this.matricula }}</h4>
          <h4 v-if="this.tipoUsuario == 2">{{ this.divisionDoc }}</h4>
          <h4 v-if="this.tipoUsuario == 3">{{ this.depto }}</h4>
        </div>
      </div>
    </div>
    <div class="container pt-2">
      <!-- Datos Alumno -->
      <div class="row  shadow rounded" v-if="this.tipoUsuario == 1">
        <div class="col-12 float-start">
          <h6 class="float-start pt-4">
            Información Académica
          </h6>
          <hr style="margin-top:5%" />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">División</label>
          <input
            type="text"
            class="form-control"
            :value="this.division"
            required
          />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Carrera</label>
          <input
            type="text"
            class="form-control"
            :value="this.carrera"
            required
          />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Grado</label>
          <input
            type="text"
            class="form-control"
            :value="this.grado"
            required
          />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Grupo</label>
          <input
            type="text"
            class="form-control"
            :value="this.grupo"
            required
          />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Tutor</label>
          <input
            type="text"
            class="form-control"
            required
            :value="this.tutor"
          />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Nivel Académico</label>
          <input
            type="text"
            class="form-control"
            required
            :value="this.nivel"
          />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Correo electrónico</label>
          <input
            type="text"
            class="form-control"
            required
            :value="this.correo"
          />
        </div>
      </div>
      <!-- Datos Docente -->
      <div class="row  shadow rounded" v-if="this.tipoUsuario == 2">
        <div class="col-12 float-start">
          <h6 class="float-start pt-4">
            Información Académica
          </h6>
          <hr style="margin-top:5%" />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Correo electrónico</label>
          <input
            type="text"
            class="form-control"
            required
            :value="this.correo"
          />
        </div>
      </div>
      <!-- Datos Administrativo -->
      <div class="row  shadow rounded" v-if="this.tipoUsuario == 3">
        <div class="col-12 float-start">
          <h6 class="float-start pt-4">
            Información Académica
          </h6>
          <hr style="margin-top:5%" />
        </div>
        <div class="mb-3 col-4">
          <label class="float-start">Correo electrónico</label>
          <input
            type="text"
            class="form-control"
            required
            :value="this.correo"
          />
          <!-- <label class="float-start">Estado Civil</label>
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
            </b-form-select> -->
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
      nombre: '',
      apellidoP: '',
      apellidoM: '',
      tipoUsuario: '',
      correo: '',
      division: '',
      carrera: '',
      grado: '',
      grupo: '',
      tutor: '',
      nivel: '',
      matricula: '',
      listaEstadoCivil: [],
      estadoCivil: '',
      divisionDoc: '',
    };
  },
  beforeMount() {
    this.correo = localStorage.getItem('username');
    this.getUser();
    this.getEstadoCivil();
  },
  methods: {
    getUser() {
      api.doGet('saps/usuario/getOne/' + this.correo).then((response) => {
        this.tipoUsuario = response.data.tipoUsuario.idTipoUsuario;
        this.nombre = response.data.nombre;
        this.apellidoP = response.data.apellidoPaterno;
        this.apellidoM = response.data.apellidoMaterno;
        this.division =
          response.data.tipoUsuario.solicitudEstudiante.carrera.division.division;
        this.grado = response.data.tipoUsuario.solicitudEstudiante.grado;
        this.grupo = response.data.tipoUsuario.solicitudEstudiante.grupo;
        this.tutor = response.data.tipoUsuario.solicitudEstudiante.tutor;
        this.nivel =
          response.data.tipoUsuario.solicitudEstudiante.nivelEstudio.nivel;
        this.carrera =
          response.data.tipoUsuario.solicitudEstudiante.carrera.carrera;
        this.matricula =
          response.data.tipoUsuario.solicitudEstudiante.matricula;
        this.divisionDoc =
          response.data.tipoUsuario.solicitudDocente.division.division;
        this.depto = response.data.tipoUsuario.solicitudEstudiante.matricula;
      });
    },
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
