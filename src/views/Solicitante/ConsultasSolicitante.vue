<template>
  <div class="row">
    <div>
      <HeaderSolicitante />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">Consultas de sesiones</h4>
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
                <th scope="col">Consultor</th>
                <th scope="col">Estado</th>
                <th scope="col">Correo</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Motivos</th>
                <th scope="col">Síntomas</th>
                <th scope="col">Prórroga</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(consulta, item) in listaConsulta"
                :key="consulta.idConsulta"
              >
                <th>{{ item + 1 }}</th>
                <td>{{ consulta.consultor.usuario.nombre +
                    " " +
                    consulta.consultor.usuario.apellidoPaterno +
                    " " +
                    consulta.consultor.usuario.apellidoMaterno}}</td>
                <td>
                    <span v-if="consulta.estado === 'Pendiente'" class="badge bg-danger">{{ consulta.estado }}</span>
                    <span v-else-if="consulta.estado === 'Prórroga'" class="badge bg-warning text-dark">{{ consulta.estado }}</span>
                    <span v-else class="badge bg-success">{{ consulta.estado }}</span>
                </td>
                <td>{{ consulta.consultor.usuario.correo }}</td>
                <td><b>{{ consulta.solicitud.fecha.split('T')[0] }}</b></td>
                <td><b>{{ consulta.solicitud.fecha.split('T')[1] }}</b></td>
                <td>
                  <template v-if="consulta.solicitud.motivos.length > 0">
                    <span v-for="(motivo, i) in consulta.solicitud.motivos"
                    :key="motivo.idMotivo">
                      <template v-if="i+1 < consulta.solicitud.motivos.length">
                          {{ motivo.motivo + ', '}}
                      </template>
                      <template v-else>
                          {{ motivo.motivo}}
                      </template>
                    </span>
                  </template>
                  <template v-else>
                        <b>{{ "Sin motivos" }}</b>
                  </template>
                </td>
                <td>
                  <template v-if="consulta.solicitud.sintomas.length > 0">
                      <span v-for="(sintoma, i) in consulta.solicitud.sintomas"
                      :key="sintoma.idSintoma">
                        <template v-if="i+1 < consulta.solicitud.sintomas.length">
                            {{ sintoma.sintoma + ', '}}
                        </template>
                        <template v-else>
                            {{ sintoma.sintoma}}
                        </template>
                      </span>
                  </template>
                  <template v-else>
                        <b>{{ "Sin síntomas" }}</b>
                  </template>
                </td>
                <td>
                  <button
                    disabled
                    type="button"
                    class="btn btn-success"
                    v-if= "consulta.solicitud.estado != 'Prórroga'"
                  >
                    <b-icon icon="clock" aria-hidden="true" ></b-icon>
                  </button>
                  <button
                    disabled
                    type="button"
                    class="btn btn-warning"
                    v-else-if= "consulta.solicitud.motivos.length > 0 || consulta.solicitud.sintomas.length > 0"
                  >
                    <b-icon icon="clock-history" aria-hidden="true" ></b-icon>
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning"
                    @click="getConsulta(consulta)"
                    data-bs-toggle="modal"
                    data-bs-target="#prorrogaModal"
                    v-else
                  >
                    <b-icon icon="clock-history" aria-hidden="true" ></b-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="container" v-if="listaConsulta.length < 1">
            <img
              src="../../assets/sinDatos.png"
              style="height: 80px; width: 80px"
              class="m-2"
            />
            <h3 class="mt-2">
              Lo sentimos, no hemos podido encontrar datos :(
            </h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Prórroga Modal -->
    <div class="modal fade" id="prorrogaModal" tabindex="-1" aria-labelledby="prorrogaModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="prorrogaModalLabel">Prórroga consulta</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mt-2 mb-4">
              <span class="text-danger">Para generar una prórroga es necesario llenar los siguienes campos: </span>
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
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal" @click="generarProrroga()">Generar prórroga</button>
          </div>
        </div>
      </div>
    </div>
    <Footer  />
  </div>
</template>

<script>
import HeaderSolicitante from "../../components/HeaderSolicitante.vue";
import Footer from "../../components/Footer.vue";
import api from '../../util/api';
export default {
  components: {
    HeaderSolicitante,
    Footer,
  },
  data() {
    return {
      consulta: {
        solicitud: {
          motivos:{},
          sintomas: {}
        }
      },
      motivos: [],
      sintomas: [],
      listaConsulta: [],
      listaMotivos: [],
      listaSintomas: [],
      correo: localStorage.getItem("username"),
      idUsuario: "",
    };
  },
  beforeMount() {
    this.getUser();
    this.getMotivos();
    this.getSintomas();
  },
  methods: {
    getUser() {
      api.doGet("saps/usuario/getOne/" + this.correo).then((response) => {
        this.idUsuario = response.data.idUsuario;
        console.log(response.data.idUsuario);
        this.getConsultas(this.idUsuario);
      });
    },
    getConsultas(id) {
      api
        .doGet('saps/consulta/getAll/usuario/' + id)
        .then((response) => (this.listaConsulta = response.data))
        .finally(() => (this.loading = false));
    },
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
    getConsulta(consulta){
      this.consulta = consulta
    },
    generarProrroga(){
      let listMotivos = [];
      let listSintomas = [];

      this.motivos.forEach(m => {
        listMotivos.push({'idMotivo': m})
      });

      this.sintomas.forEach(s => {
        listSintomas.push({'idSintoma': s})
      });
      this.consulta.solicitud.motivos = listMotivos
      this.consulta.solicitud.sintomas = listSintomas

      api
        .doPost('saps/consulta/save', this.consulta)
        .then(() => {
          api
            .doPost('saps/solicitud/save', this.consulta.solicitud)
            .then(() => {
              this.getSolicitudes()
              this.$swal({
                title: 'Prórroga realizada',
                text: "La prórroga ha sido realizada con éxito",
                icon: 'success',
              })
            })
            .catch((error) => {
              let errorResponse = error;
              if (errorResponse.errorExists) {
                this.$swal({
                  title: 'Lo sentimos',
                  text: "Hubo un error al realizar la prórroga",
                  icon: 'error',
                  confirmButtonColor: '#d33',
                  confirmButtonText: 'Aceptar'
                });
              } else {
                this.$swal({
                  title: 'Lo sentimos',
                  text: "Hubo un error al realizar la prórroga",
                  icon: 'error',
                  confirmButtonColor: '#d33',
                  confirmButtonText: 'Aceptar'
                });
              }
            });
      })
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
