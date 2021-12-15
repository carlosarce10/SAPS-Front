<template>
  <div class="row">
    <div>
      <HeaderSolicitante />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">Bitacora de solicitudes</h4>
        </div>
      </div>
    </div>
    <div class="container pt-2">
      <!-- Tabla de consultas -->
      <div class="row shadow rounded">
        <div class="col-12">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Estado</th>
                <th scope="col">Nombre del consultor</th>
                <th scope="col">Leer más</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(solicitudes, item) in listaSolicitud"
                :key="solicitudes.idBitacoraSolicitud"
              >
                <th>{{ item + 1 }}</th>
                <td>{{ solicitudes.solicitud.fecha }}</td>
                <td>{{ solicitudes.solicitud.estado }}</td>
                <td>
                  {{
                    solicitudes.solicitud.consultor.usuario.nombre +
                    " " +
                    solicitudes.solicitud.consultor.usuario.apellidoPaterno +
                    " " +
                    solicitudes.solicitud.consultor.usuario.apellidoMaterno
                  }}
                </td>
                <td>
                  <b-button
                    @click="datosSolicitud(solicitudes.idBitacoraSolicitud)"
                    type="button"
                    variant="outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#leerModal"
                    ><b-icon icon="book" aria-hidden="true"></b-icon>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="container" v-if="listaSolicitud.length < 1">
            <img
              src="../../assets/sinDatos.png"
              style="height: 80px; width: 80px"
              class="m-2"
            />
            <h3 class="mt-2">
              Lo sentimos, no hemos podido encontrar datos :(
            </h3>
          </div>
          <!-- Modal para leer mas -->
          <div
            class="modal fade"
            id="leerModal"
            tabindex="-1"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Leer más</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <label class="float-start">Solicitante</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.solicitante"
                      disabled
                    />
                    <label class="float-start">Motivos</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.motivo"
                      disabled
                    />
                    <label class="float-start">Sintomas</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.sintoma"
                      disabled
                    />
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer class="fixed-bottom" />
  </div>
</template>

<script>
import HeaderSolicitante from "../../components/HeaderSolicitante.vue";
import Footer from "../../components/Footer.vue";
import api from "../../util/api";
export default {
  components: {
    HeaderSolicitante,
    Footer,
  },
  data() {
    return {
      listaSolicitud: [],
      correo: localStorage.getItem("username"),
      idUsuario: "",
      form: {
          solicitante: '',
          motivo:'',
          sintoma: '',
      }
    };
  },
  beforeMount() {
    this.getUser();
    this.getSolicitudes();
  },
  methods: {
    getUser() {
      api.doGet("saps/usuario/getOne/" + this.correo).then((response) => {
        this.idUsuario = response.data.idUsuario;
        this.getSolicitudes(this.idUsuario);
      });
    },
    getSolicitudes(id) {
      api
        .doGet("saps/bitacora/solicitud/getAll/usuario/" + id)
        .then((response) => (this.listaSolicitud = response.data))
        .finally(() => (this.loading = false));
    },
    datosSolicitud(id){
      api
        .doGet('saps/bitacora/solicitud/getOne/' + id)
        .then((response) => {
          console.log('ID --> ' + id);
          console.log('response: ' + response.data.solicitud.motivos[0].motivo);
          this.form.id = response.data.idBitacoraSolicitud;
          this.form.solicitante = response.data.solicitud.solicitante.usuario.nombre +
          ' ' + response.data.solicitud.solicitante.usuario.apellidoPaterno +
          ' ' + response.data.solicitud.solicitante.usuario.apellidoMaterno;
          this.form.motivo = response.data.solicitud.motivos[0].motivo;
          this.form.sintoma = response.data.solicitud.sintomas[0].sintoma;
        })
        .catch((error) => {
          let errorResponse = error;
          if (errorResponse.errorExists) {
            this.$swal({
              title: 'Oops! Ha ocurrido un error en el servidor.',
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                '</b> ' +
                errorResponse.message +
                '<br>Contacte a su operador para más detalles.</span>',
              icon: 'error',
            });
          } else {
            this.$swal({
              title: 'Oops! Ha ocurrido un error en el servidor.',
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: 'error',
            });
          }
        });
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

