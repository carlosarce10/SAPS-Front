<template>
  <div class="row">
    <div>
      <HeaderInicio />
    </div>
    <div
      class="inicioSesion col-3 position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 rounded row"
    >
      <h5 class=" text-muted p-3">
        Iniciar Sesión
      </h5>

      <form @submit="authenticate" v-if="show">
        <div class="mb-3">
          <label class="float-start">Correo electrónico</label>
          <input
            v-model="user.nickname"
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div class="mb-3">
          <label class="float-start">Contraseña</label>
          <input
            v-model="user.password"
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
        <a class=" text-muted" href="/registro">No estoy registrado</a>
      </div>
    </div>
    <Footer class="fixed-bottom" />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue';
import HeaderInicio from '../components/HeaderInicio.vue';
import api from '../util/api';
export default {
  name: 'Home',
  components: {
    Footer,
    HeaderInicio,
  },
  data() {
    return {
      user: {
        nickname: '',
        password: '',
      },
      show: true,
    };
  },
  methods: {
    authenticate(e) {
      e.preventDefault();
      if (this.user !== null && this.user !== '') {
        api
          .doPost('auth/login', this.user)
          .then((response) => {
            console.log(response);
            if (response.data.token !== null && response.data.token !== '') {
              let auth = response.data.authorities[0].authority;
              let nickname = response.data.username;
              let token = response.data.token;

              localStorage.setItem('authority', auth);
              localStorage.setItem('username', nickname);
              localStorage.setItem('token', token);

              if (auth == 'ROLE_ADMIN') {
                this.$router.push({ name: 'InicioAdmin' });
              } else if (auth == 'ROLE_CONSULTOR') {
                this.$router.push({ name: 'InicioDocente' });
              } else if (auth == 'ROLE_SOLICITANTE') {
                this.$router.push({ name: 'InicioSolicitante' });
              }
            }
          })
          .catch((error) => {
            let errorResponse = error.response.data;
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
    },
  },
};
</script>

<style scoped>
.inicioSesion {
  border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
