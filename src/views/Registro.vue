<template>
  <div class="row">
    <div>
      <HeaderInicio />
    </div>
    <!-- Card de registro -->
    <div
      class="row inicioSesion col-6 position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 rounded"
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
              v-model="form.tipoUsuario"
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
          <div class="col-12">
            <button type="submit" class="btn btn-primary mb-3 float-end">
              Siguiente
            </button>
          </div>
        </div>
      </form>
      <!-- Registro datos estudiante -->
      <form @submit="onSubmit" v-if="estudiante">
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
              :options="niveles"
              v-model="formAlumno.nivel"
              class="form-select"
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Carrera</label>
            <b-form-select
              required
              :options="carreras"
              v-model="formAlumno.carrera"
              class="form-select"
            />
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
            <div class="col-6">
              <button
                @click="regresar()"
                class="btn btn-danger mb-3 float-start"
              >
                <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
              </button>
            </div>
            <div class="col-6">
              <button type="submit" class="btn btn-primary mb-3 float-end">
                Registrarme
              </button>
            </div>
          </div>
        </div>
      </form>
      <!-- Registro datos docente -->
      <form @submit="onSubmit" v-if="docente">
        <div class="row">
          <div class="mb-3 col-4">
            <label class="float-start">División</label>
            <b-form-select
              required
              :options="divisiones"
              v-model="formDocente.division"
              class="form-select"
            />
          </div>
          <div class="row">
            <div class="col-6">
              <button
                @click="regresar()"
                class="btn btn-danger mb-3 float-start"
              >
                <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
              </button>
            </div>
            <div class="col-6">
              <button type="submit" class="btn btn-primary mb-3 float-end">
                Registrarme
              </button>
            </div>
          </div>
        </div>
      </form>
      <!-- Registro datos administrativo -->
      <form @submit="onSubmit" v-if="administrativo">
        <div class="row">
          <div class="mb-3 col-4">
            <label class="float-start">Departamento</label>
            <b-form-select
              required
              :options="departamentos"
              v-model="formAdmin.departamento"
              class="form-select"
            />
          </div>
          <div class="row">
            <div class="col-6">
              <button
                @click="regresar()"
                class="btn btn-danger mb-3 float-start"
              >
                <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
              </button>
            </div>
            <div class="col-6">
              <button type="submit" class="btn btn-primary mb-3 float-end">
                Registrarme
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
        sexo: '',
        tipoUsuario: '',
        contrasenia: '',
      },
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
      show: true,
      estudiante: false,
      administrativo: false,
      docente: false,
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
      niveles: [
        { value: 1, text: 'TSU' },
        { value: 2, text: 'ING' },
        { value: 3, text: 'LIC' },
      ],
      carreras: [
        { value: 1, text: 'IDyGS' },
        { value: 2, text: 'Diseño' },
        { value: 3, text: 'Mecatrónica' },
      ],
      divisiones: [
        { value: 1, text: 'DATIC' },
        { value: 2, text: 'DATEFI' },
        { value: 3, text: 'DAMI' },
        { value: 3, text: 'DACEA' },
      ],
      departamentos: [
        { value: 1, text: 'Depto. 1' },
        { value: 2, text: 'Depto. 2' },
        { value: 3, text: 'Depto. 3' },
        { value: 3, text: 'Depto. 4' },
      ],
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form.tipoUsuario));
      if (this.form.tipoUsuario == '1') {
        this.estudiante = true;
        this.show = false;
      } else if (this.form.tipoUsuario == '2') {
        this.docente = true;
        this.show = false;
      } else if (this.form.tipoUsuario == '3') {
        this.administrativo = true;
        this.show = false;
      }
    },
    regresar() {
      this.show = true;
      this.estudiante = false;
      this.docente = false;
      this.administrativo = false;
    },
  },
};
</script>

<style scoped>
.inicioSesion {
  border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
