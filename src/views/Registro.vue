<template>
  <div class="row">
    <div>
      <HeaderInicio />
    </div>
    <!-- Card de registro -->
    <div
      class="row inicioSesion col-7 position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 rounded"
    >
      <img
        src="../assets/logoApoyo.png"
        style="height: 45px; width: 200px;"
        alt=""
      />
      <h5 v-if="show" class=" text-muted p-3">
        Registro
      </h5>
      <h5 v-if="estudiante" class=" text-muted p-3">
        Registro de Alumno
      </h5>
      <h5 v-if="docente" class=" text-muted p-3">
        Registro de Docente
      </h5>
      <h5 v-if="administrativo" class=" text-muted p-3">
        Registro de Administrativo
      </h5>
      <!-- Registro datos genericos -->
      <form @submit="onSubmit" v-if="show">
        <div class="row">
          <div class="mb-3 col-4">
            <label class="float-start">Nombre(s)</label>
            <input
              v-model="form.nombre"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Apellido Paterno</label>
            <input
              v-model="form.apellidoP"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Apellido Materno</label>
            <input
              v-model="form.apellidoM"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Correo electrónico</label>
            <input
              v-model="form.correo"
              type="email"
              class="form-control"
              aria-describedby="emailHelp"
              required
              pattern=".+@utez.edu.mx"
              title="Debe ingresar un correo institucional '@utez.edu.mx'"
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Sexo</label>
            <b-form-select
              required
              :options="sexos"
              v-model="form.sexo"
              class="form-select"
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Tipo de usuario</label>
            <b-form-select
              required
              :options="tiposUsario"
              v-model="tipoUsuario"
              class="form-select"
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Contraseña</label>
            <input
              v-model="form.contrasenia"
              type="password"
              class="form-control"
              required
            />
          </div>
          <div class="row">
            <div class="col-12">
              <button type="submit" class="btn btn-primary m-1 float-end">
                Siguiente
                <b-icon icon="arrow-right" aria-hidden="true"></b-icon>
              </button>
              <button
                @click="regresarInicio()"
                class="btn btn-danger m-1 float-end"
              >
                Regresar
                <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
              </button>
            </div>
          </div>
        </div>
      </form>
      <!-- Registro datos estudiante -->
      <form v-if="estudiante">
        <div class="row">
          <div class="mb-3 col-4">
            <label class="float-start">Matricula</label>
            <input
              v-model="formAlumno.matricula"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Nivel Académico</label>
            <b-form-select
              required
              v-model="formAlumno.nivel"
              class="form-select"
            >
              <option
                v-for="niveles in listaNiveles"
                v-bind:key="niveles.nivel"
                v-bind:value="niveles.idNivel"
              >
                {{ niveles.nivel }}
              </option></b-form-select
            >
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Carrera</label>
            <b-form-select
              required
              v-model="formAlumno.carrera"
              class="form-select"
            >
              <option
                v-for="carreras in listaCarreras"
                v-bind:key="carreras.carrera"
                v-bind:value="carreras.idCarrera"
              >
                {{ carreras.carrera }}
              </option></b-form-select
            >
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Grado</label>
            <input
              v-model="formAlumno.grado"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Grupo</label>
            <input
              v-model="formAlumno.grupo"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Tutor</label>
            <input
              v-model="formAlumno.tutor"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="row">
            <div class="col-12">
              <button
                type="submit"
                @click="registroEstudiante()"
                class="btn btn-primary m-1 float-end"
              >
                Registrarme
              </button>
              <button @click="regresar()" class="btn btn-danger m-1 float-end">
                Regresar
                <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
              </button>
            </div>
          </div>
        </div>
      </form>
      <!-- Registro datos docente -->
      <form v-if="docente">
        <div class="row">
          <div class="mb-3 col-4">
            <label class="float-start">División académica</label>
            <b-form-select v-model="division" class="form-select">
              <option
                v-for="div in listaDivisiones"
                v-bind:key="div.division"
                v-bind:value="div.idDivision"
              >
                {{ div.division }}
              </option>
            </b-form-select>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="submit" class="btn btn-primary m-1 float-end">
                Registrarme
              </button>
              <button @click="regresar()" class="btn btn-danger m-1 float-end">
                Regresar
                <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
              </button>
            </div>
          </div>
        </div>
      </form>
      <!-- Registro datos administrativo -->
      <form v-if="administrativo">
        <div class="row">
          <div class="mb-3 col-4">
            <label class="float-start">Departamento</label>
              <b-form-select
                v-model="formAdmin.departamento"
                size="sm"
                class="form-select form-select-sm mt-3"
              >
                <option
                  v-for="dep in listaDepartamentos"
                  v-bind:key="dep.departamento"
                  v-bind:value="dep.idDepartamento"
                >
                  {{ dep.departamento}}
                </option>
              </b-form-select>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="submit" class="btn btn-primary m-1 float-end">
                Registrarme
              </button>
              <button @click="regresar()" class="btn btn-danger m-1 float-end">
                Regresar
                <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <Footer class="fixed-bottom" />
  </div>
</template>

<script>
import HeaderInicio from '../components/HeaderInicio.vue';
import Footer from '../components/Footer.vue';
import api from '../util/api';

export default {
  components: {
    HeaderInicio,
    Footer,
  },
  data() {
    return {
      form: {
        nombre: '',
        apellidoP: '',
        apellidoM: '',
        correo: '',
        contrasenia: '',
        sexo: '',
      },
      tipoUsuario: '',
      formAlumno: {
        matricula: '',
        nivel: '',
        carrera: '',
        grado: '',
        grupo: '',
        tutor: '',
      },
      formDocente: {
        division: '',
      },
      formAdmin: {
        departamento: '',
      },
      listaDivisiones: [],
      listaNiveles: [],
      listaCarreras: [],
      listaDepartamentos: [],
      division: '',
      show: true,
      estudiante: false,
      administrativo: false,
      docente: false,
      id: '',
      sexos: [
        { value: 1, text: 'Hombre' },
        { value: 2, text: 'Mujer' },
        { value: 3, text: 'Otro' },
      ],
      tiposUsario: [
        { value: 1, text: 'Estudiante' },
        { value: 2, text: 'Docente' },
        { value: 3, text: 'Administrativo' },
      ],
    };
  },
  beforeMount() {
    this.getDivisiones();
    this.getNiveles();
    this.getCarreras();
    this.getDepartamentos();
  },
  computed: {},
  methods: {
    onSubmit() {
      this.form = {
        nombre: this.form.nombre,
        apellidoPaterno: this.form.apellidoP,
        apellidoMaterno: this.form.apellidoM,
        correo: this.form.correo,
        password: this.form.contrasenia,
        sexo: this.form.sexo,
      };
      if (this.form !== null && this.form !== '') {
        api
          .doPost('auth/register/solicitante', this.form)
          .then((response) => (this.id = response.data))
          .then(() => {
            this.$swal({
              title: 'Se guardaron exitosamente tus datos',
              icon: 'success',
            });
            this.onReset();
          })
          .catch((error) => {
            let errorResponse = error;
            if (errorResponse.errorExists) {
              this.$swal({
                title: 'Ha ocurrido un error en el servidor!',
                html:
                  "<span style='font-size:14pt'><b>" +
                  errorResponse.code +
                  '</b> ' +
                  errorResponse.message +
                  '<br>Para más información contacte a su operador.</span>',
                icon: 'error',
              });
            } else {
              this.$swal({
                title: 'Ha ocurrido un error en el servidor!',
                html:
                  "<span style='font-size:14pt'>Para más información contacte a su operador.</span>",
                icon: 'error',
              });
            }
          });
      }
      if (this.tipoUsuario == '1') {
        this.estudiante = true;
        this.show = false;
      } else if (this.tipoUsuario == '2') {
        this.docente = true;
        this.show = false;
      } else if (this.tipoUsuario == '3') {
        this.administrativo = true;
        this.show = false;
      }
    },
    getDivisiones() {
      api
        .doGet('saps/division/getAll')
        .then((response) => (this.listaDivisiones = response.data));
    },
    getNiveles() {
      api
        .doGet('saps/nivel/getAll')
        .then((response) => (this.listaNiveles = response.data));
    },
    getCarreras() {
      api
        .doGet('saps/carrera/getAll')
        .then((response) => (this.listaCarreras = response.data));
    },
    getDepartamentos() {
      api
        .doGet('saps/departamento/getAll')
        .then((response) => (this.listaDepartamentos = response.data));
    },
    registroEstudiante() {
      console.log('ID: ' + this.id);
      this.formAlumno = {
        matricula: this.formAlumno.matricula,
        nivelEstudio: { idNivel: this.formAlumno.nivel },
        carrera: { idCarrera: this.formAlumno.carrera },
        grado: this.formAlumno.grado,
        grupo: this.formAlumno.grupo,
        tutor: this.formAlumno.tutor,
      };
      api
        .doPost('saps/solicitud/estudiante/save/' + this.id, this.formAlumno)
        .then(() => {
          this.$swal({
            title: 'Se registró exitosamente',
            icon: 'success',
          });
          this.onReset();
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          let errorResponse = error;
          if (errorResponse.errorExists) {
            this.$swal({
              title: 'Ha ocurrido un error en el servidor!',
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                '</b> ' +
                errorResponse.message +
                '<br>Para más información contacte a su operador.</span>',
              icon: 'error',
            });
          } else {
            this.$swal({
              title: 'Ha ocurrido un error en el servidor!',
              html:
                "<span style='font-size:14pt'>Para más información contacte a su operador.</span>",
              icon: 'error',
            });
          }
        });
    },
    registroDocente() {
      console.log('ID: ' + this.id);
      this.formDocente = {
        division: { idDivision: this.formDocente.division },
      };
      api
        .doPost('saps/solicitud/docente/save/' + this.id, this.formDocente)
        .then(() => {
          this.$swal({
            title: 'Se registró exitosamente',
            icon: 'success',
          });
          this.onReset();
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          let errorResponse = error;
          if (errorResponse.errorExists) {
            this.$swal({
              title: 'Ha ocurrido un error en el servidor!',
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                '</b> ' +
                errorResponse.message +
                '<br>Para más información contacte a su operador.</span>',
              icon: 'error',
            });
          } else {
            this.$swal({
              title: 'Ha ocurrido un error en el servidor!',
              html:
                "<span style='font-size:14pt'>Para más información contacte a su operador.</span>",
              icon: 'error',
            });
          }
        });
    },
    registroAdministrativo() {
      console.log('ID: ' + this.id);
      this.formAdmin = {
        departamento: { idDepartamento: this.formAdmin.departamento },
      };
      api
        .doPost('saps/solicitud/administrativo/save/' + this.id, this.formAdmin)
        .then(() => {
          this.$swal({
            title: 'Se registró exitosamente',
            icon: 'success',
          });
          this.onReset();
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          let errorResponse = error;
          if (errorResponse.errorExists) {
            this.$swal({
              title: 'Ha ocurrido un error en el servidor!',
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                '</b> ' +
                errorResponse.message +
                '<br>Para más información contacte a su operador.</span>',
              icon: 'error',
            });
          } else {
            this.$swal({
              title: 'Ha ocurrido un error en el servidor!',
              html:
                "<span style='font-size:14pt'>Para más información contacte a su operador.</span>",
              icon: 'error',
            });
          }
        });
    },
    regresar() {
      this.show = true;
      this.estudiante = false;
      this.docente = false;
      this.administrativo = false;
    },
    regresarInicio() {
      this.$router.push({ name: 'Home' });
    },
    onReset() {
      this.form.nombre = '';
      this.form.apellidoP = '';
      this.form.apellidoM = '';
      this.form.correo = '';
      this.form.sexo = '';
      this.form.tipoUsuario = '';
      this.form.contrasenia = '';
      this.formAlumno.matricula;
      this.formAlumno.nivel;
      this.formAlumno.carrera;
      this.formAlumno.grado;
      this.formAlumno.grupo;
      this.formAlumno.tutor;
    },
  },
};
</script>

<style scoped>
.inicioSesion {
  border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
