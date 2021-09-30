<template>
  <div class="row">
    <div>
      <HeaderSoli />
    </div>
    <div class="position-relative" style="margin-top: 18%;">
      <div
        class="inicioSesion col-3 position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 rounded"
      >
        <!-- <img
          src="../assets/logoApoyo.png"
          style="height: 45px; width: 200px;"
          alt=""
        /> -->
        <h5 class=" text-muted p-3">
          Iniciar Sesión
        </h5>
        <div class="row">
          <form @submit="onSubmit" v-if="show">
            <div class="mb-3">
              <label class="float-start">Correo electrónico</label>
              <input
                v-model="correo"
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div class="mb-3">
              <label class="float-start">Contraseña</label>
              <input
                v-model="contrasenia"
                type="password"
                class="form-control"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary mb-3 float-end ">
              Iniciar
            </button>
          </form>
          <div class="col-12">
            <a class=" text-muted" href="">No estoy registrado</a>
          </div>
        </div>
      </div>
    </div>
    <Footer class="fixed-bottom" />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue';
/* import HeaderInicio from '../components/HeaderInicio.vue'; */
import HeaderSoli from '../components/HeaderSolicitante.vue';
export default {
  name: 'Home',
  components: {
    Footer,
    HeaderSoli,
  },
  data() {
    return {
      contrasenia: '',
      correo: '',
      show: true,
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
  background-color: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
