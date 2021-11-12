<template>
  <div class="row">
    <div>
      <HeaderSolicitante />
    </div>
    <div>
      <div class="container pt-4">
        <div class="row perfil rounded">
          <div class="col-12 float-start">
            <h4 class="float-start p-1">Registro de solicitud</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Solicitud -->

    <div
      class="
        row
        inicioSesion
        col-7
        position-absolute
        top-50
        start-50
        translate-middle
        shadow
        p-3
        mb-5
        rounded
      "
    >
    <form>
      <div class="mb-3 col-4">
        <label class="float-start">Motivo</label>
        <b-form-select required v-model="motivo" class="form-select">
          <option
            v-for="motivo in listaMotivos"
            v-bind:key="motivo.motivo"
            v-bind:value="motivo.idMotivo"
          >
            {{ motivo.motivo }}
          </option>
          <b-form-select-option value="" disabled>Elige una opción</b-form-select-option>
        </b-form-select>
      </div>
      <div class="mb-3 col-4">
        <label class="float-start">Sintomas</label>
        <b-form-select required v-model="sintoma" class="form-select">
          <option
            v-for="sintoma in listaSintomas"
            v-bind:key="sintoma.sintoma"
            v-bind:value="sintoma.idSintoma"
          >
            {{ sintoma.sintoma }}
          </option>
          <b-form-select-option value="" disabled>Elige una opción</b-form-select-option>
        </b-form-select>
      </div>
      <div class="mt-4 col-4">
        <button
          type="submit"
          @click="registroSolicitud()"
          class="btn btn-primary m-1 float-end"
        >
          Registrarme
        </button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import HeaderSolicitante from "../../components/HeaderSolicitante.vue";
import api from "../../util/api";

var fecha = new Date();
var fechaActual = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+(fecha.getDate()+1);

console.log(fechaActual);
export default {
  components: {
    HeaderSolicitante,
  },
  data() {
    return {
      listaMotivos: [],
      listaSintomas: [],
      form: {
      },
      motivo: '',
      sintoma: '',
      correo: '',
      idSolicitante:'',
      idUsuario: '',
    };
  },
  beforeMount() {
    this.correo = localStorage.getItem("username");
    this.getUser();
    this.getSintomas();
    this.getMotivos();
  },
  methods: {
    getMotivos() {
      api
        .doGet('saps/motivo/getAll')
        .then((response) => (this.listaMotivos = response.data))
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
    getSintomas() {
      api
        .doGet('saps/sintoma/getAll')
        .then((response) => (this.listaSintomas = response.data))
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
    registroSolicitud() {
    this.form = {
        fecha: fechaActual,
        solicitante: {
            idSolicitante: this.idSolicitante,
        },
        estado: 'Pendiente',
        motivo: this.motivo,
        sintoma: this.sintoma,
      },
      api
        .doPost('saps/solicitud/save', this.form)
        .then(() => {
            console.log(this.form.fecha);
          this.$swal({
            title: 'Tu solicitud se ha registrado de manera exitosa!',
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
    },
    getUser() {
      api.doGet('saps/usuario/getOne/' + this.correo).then((response) => {
        this.idUsuario = response.data.idUsuario;
        //console.log(response.data.idUsuario);
        this.getSolicitante(this.idUsuario);
      });
    },
    getSolicitante(id) {
      api
        .doGet('saps/solicitante/getAll/usuario/' + id)
        .then(
          (response) => (
            (this.idSolicitante = response.data[0].idSolicitante)
          )
        )
        .then(() => console.log(this.show));
    },
    onReset() {
      this.form.fecha = '';
      this.form.motivo = '';
      this.form.sintoma = '';
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
