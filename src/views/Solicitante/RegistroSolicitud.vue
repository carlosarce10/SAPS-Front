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
        <b-form-timepicker id="timeSolicitud" v-model="timeSolicitud" locale="es-MX"></b-form-timepicker>
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
          <option v-bind:value="consultor" selected="selected">Elige una opción</option>
          <option
            v-for="c in consultores"
            v-bind:key="c.consultor"
            v-bind:value="c.idConsultor"
          >
            {{ c.usuario.nombre + ' ' + c.usuario.apellidoPaterno + ' ' + c.usuario.apellidoMaterno }}
          </option>
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

export default {
  components: {
    HeaderSolicitante,
  },
  data() {
    return {
      listaMotivos: [],
      listaSintomas: [],
      consultores: [],
      form: {},
      consulta: {},
      dateSolicitud: '',
      timeSolicitud: '',
      time: '',
      motivos: [],
      sintomas: [],
      consultor: null,
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
              title: 'Lo sentimos',
              text: "Hubo un error al recuperar los motivos",
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            });
          } else {
            this.$swal({
              title: 'Lo sentimos',
              text: "Hubo un error al recuperar los motivos",
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
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
              title: 'Lo sentimos',
              text: "Hubo un error al recuperar los sintomas",
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            });
          } else {
            this.$swal({
              title: 'Lo sentimos',
              text: "Hubo un error al recuperar los sintomas",
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            });
          }
        })
        .finally(() => (this.loading = false));
    },
    getConsultores() {
      api
        .doGet('saps/consultor/getAll')
        .then((response) => {
          this.consultores = response.data
          //this.consultor = this.consultores[0].idConsultor
        })
        .catch((error) => {
          let errorResponse = error;
          console.log(error);
          if (errorResponse) {
            this.$swal({
              title: 'Lo sentimos',
              text: "Hubo un error al recuperar los consultores",
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            });
          } else {
            this.$swal({
              title: 'Lo sentimos',
              text: "Hubo un error al recuperar los consultores",
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
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

      let dateSolicitud = new Date(this.dateSolicitud+" "+this.timeSolicitud).toISOString();
      dateSolicitud = dateSolicitud.split('T')[0]

      if (this.consultor != null) {
        this.consultor = {
          idConsultor: this.consultor
        }
      }

      this.form = {
        fecha: dateSolicitud+'T'+this.timeSolicitud,
        estado: 'Pendiente',
        solicitante: {
            idSolicitante: this.idSolicitante,
        },
        motivos: listMotivos, 
        sintomas: listSintomas, 
        consultor: this.consultor
      }

      console.log(this.form);

      api
        .doPost('saps/solicitud/save', this.form)
        .then(() => {
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
              title: 'Lo sentimos',
              text: "Hubo un error al registrar la solicitud",
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            });
          } else {
            this.$swal({
              title: 'Lo sentimos',
              text: "Hubo un error al registrar la solicitud",
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
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
