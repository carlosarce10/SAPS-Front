<template>
  <div class="row">
    <div>
      <HeaderInicio />
    </div>
    <div
      class="row inicioSesion col-6 position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 rounded"
    >
      <img
        src="../assets/logoApoyo.png"
        style="height: 45px; width: 200px;"
        alt=""
      />
      <h5 class=" text-muted p-3">
        Registro
      </h5>

      <form @submit="onSubmit" v-if="show">
        <div class="row">
          <div class="mb-3 col-4">
            <label class="float-start">Nombre(s)</label>
            <input v-model="nombre" type="text" class="form-control" required />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Apellido Paterno</label>
            <input
              v-model="apellidoP"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Apellido Materno</label>
            <input
              v-model="apellidoM"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3 col-4">
            <label class="float-start">Correo electrónico</label>
            <input
              v-model="correo"
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
              v-model="sexo"
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
              v-model="contrasenia"
              type="password"
              class="form-control"
              required
            />
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary mb-3 float-end">
              Registrarme
            </button>
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
      nombre: '',
      apellidoP: '',
      apellidoM: '',
      correo: '',
      sexo: '',
      tipoUsuario: '',
      contrasenia: '',
      show: true,
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
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
  },
};
</script>

<style scoped>
.inicioSesion {
  border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
