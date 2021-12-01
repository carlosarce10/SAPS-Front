<template>
  <div class="row">
    <div>
      <HeaderSolicitante />
    </div>
    <div>
      <div class="container pt-4">
        <div class="row perfil rounded">
          <div class="col-8 float-start">
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
        col-8
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
      <div class="mb-3 col-12">
        <label for="dateSolicitud" class="float-start">Elige una fecha</label>
        <b-form-datepicker id="dateSolicitud" v-model="dateSolicitud" class="mb-2 form-select"></b-form-datepicker>
      </div>
      <div class="mb-3 col-12">
        <label for="timeSolicitud" class="float-start">Elige una hora</label>
        <b-form-timepicker id="timeSolicitud" v-model="timeSolicitud" locale="es"></b-form-timepicker>
      </div>
      <div class="mb-3 col-12">
        <label class="float-start">Motivo</label>
        <b-form-select required v-model="motivos" multiple :select-size="listaMotivos.length" class="form-select">
          <option
            v-for="motivo in listaMotivos"
            v-bind:key="motivo.motivo"
            v-bind:value="motivo.idMotivo"
          >
            {{ motivo.motivo }}
          </option>
        </b-form-select>
      </div>
      <div class="mb-3 col-12">
        <label class="float-start">Sintomas</label>
        <b-form-select required v-model="sintomas" multiple :select-size="listaSintomas.length" class="form-select">
          <option
            v-for="sintoma in listaSintomas"
            v-bind:key="sintoma.sintoma"
            v-bind:value="sintoma.idSintoma"
          >
            {{ sintoma.sintoma }}
          </option>
        </b-form-select>
      </div>
      <div class="mb-3 col-12">
        <label class="float-start">Consultores</label>
        <b-form-select required v-model="consultor" class="form-select">
          <option
            v-for="consultor in consultores"
            v-bind:key="consultor.consultor"
            v-bind:value="consultor.idConsultor"
          >
            {{ consultor.usuario.nombre + ' ' + consultor.usuario.apellidoPaterno + ' ' + consultor.usuario.apellidoMaterno }}
          </option>
          <b-form-select-option value="" disabled>Elige una opción</b-form-select-option>
        </b-form-select>
      </div>
      <div class="mb-3 col-12">
        <b-button
          variant="primary"
          type="button"
          @click="registroSolicitud()"
          class="m-1 float-end"
        >
          Registrarme
        </b-button>
        <b-button
          variant="danger"
          type="button"
          href="/solicitante/inicio"
          class="m-1 float-end"
        >
          Cancelar
        </b-button>
      </div>
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
      consultores: [],
      form: {
      },
      dateSolicitud: '',
      timeSolicitud: '',
      time: '',
      motivos: [],
      sintomas: [],
      consultor: '',
      correo: localStorage.getItem("username"),
      idSolicitante:'',
      idUsuario: '',
    };
  },
  beforeMount() {
    this.getUser();
    this.getConsultores();
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
    getConsultores() {
      api
        .doGet('saps/consultor/getAll')
        .then((response) => (this.consultores = response.data))
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
      let listMotivos = [];
      let listSintomas = [];

      this.motivos.forEach(m => {
        listMotivos.push({'idMotivo': m})
      });

      this.sintomas.forEach(s => {
        listSintomas.push({'idSintoma': s})
      });

      this.form = {
        fecha: fechaActual,
        estado: 'Pendiente',
        solicitante: {
            idSolicitante: this.idSolicitante,
        },
        motivos: listMotivos, 
        sintomas: listSintomas, 
        consultor: {
          idConsultor: this.consultor
        }
      }
      api
        .doPost('saps/solicitud/save', this.form)
        .then(() => {
          this.$swal({
            title: 'La solicitud se ha registrado correctamente',
            icon: 'success',
          });
          this.$swal({
            title: 'Solicitud registrada',
            text: "La solicitud ha sido generada y enviada correctamente",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/solicitante/inicio");
            }
          })
          
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
        .then((e) => console.log(e));
    },
    onReset() {
      this.form = {}
      this.getSintomas();
      this.getMotivos();
    }
  },
};
</script>

<style scoped>
.perfil {
  background: #00ab84;
  color: white;
}
</style>
