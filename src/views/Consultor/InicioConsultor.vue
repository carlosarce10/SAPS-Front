<template>
  <div class="row">
    <div><Header /></div>
    <div class="container pt-5 pb-3">
      <div class="row perfil rounded">
        <div class="col-12 float-start border border-dark text-dark">
          <h2 class="float-start pt-2">
            Consultas
          </h2>
        </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="container pt-4">
      <div class="row shadow rounded">
        <div class="col-12">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre completo</th>
                <th scope="col">Estado</th>
                <th scope="col">Correo</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Motivos</th>
                <th scope="col">Síntomas</th>
                <th scope="col">Prórroga</th>
                <th scope="col">Terminar</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(consulta, item) in consultas"
                :key="consulta.idConsulta"
              >
                <th scope="row">{{ item + 1 }}</th>
                <td>{{ consulta.solicitud.solicitante.usuario.nombre + ' ' + consulta.solicitud.solicitante.usuario.apellidoPaterno 
                      + ' ' + consulta.solicitud.solicitante.usuario.apellidoMaterno }}</td>
                <td>
                    <span v-if="consulta.estado === 'Pendiente'" class="badge bg-danger">{{ consulta.estado }}</span>
                    <span v-else-if="consulta.estado === 'Prórroga'" class="badge bg-warning text-dark">{{ consulta.estado }}</span>
                    <span v-else class="badge bg-success">{{ consulta.estado }}</span>
                </td>   
                <td>{{ consulta.solicitud.solicitante.usuario.correo }}</td>
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
                    class="btn btn-warning"
                    v-if= "consulta.solicitud.estado == 'Terminada'"
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
                <td>
                  <button
                    disabled
                    type="button"
                    class="btn btn-success"
                    v-if= "consulta.solicitud.estado == 'Terminada'"
                  >
                    <b-icon icon="check2-square" aria-hidden="true" ></b-icon>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="finalizarConsulta(consulta)"
                    v-else
                  >
                    <b-icon icon="check2-square" aria-hidden="true" ></b-icon>
                  </button>
                </td>
              </tr>
              <!-- Sin datos -->
              <div class="container" v-if="consultas.length < 1">
                <img
                  src="../../assets/sinDatos.png"
                  style="height: 80px; width: 80px"
                  class="m-2"
                />
                <h3 class="mt-2">
                  Lo sentimos, no hemos podido encontrar datos :(
                </h3>
              </div>
            </tbody>
          </table>
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
            <div class="mb-3 col-12">
              <label for="dateProrroga" class="float-start">Elige una fecha</label>
              <b-form-datepicker id="dateProrroga" v-model="dateProrroga" class="mb-2 form-select"></b-form-datepicker>
            </div>
            <div class="mb-3 col-12">
              <label for="timeProrroga" class="float-start">Elige una hora</label>
              <b-form-timepicker id="timeProrroga" v-model="timeProrroga" locale="es-MX"></b-form-timepicker>
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
import Header from '../../components/HeaderConsultor.vue';
import api from "../../util/api.js";
import Footer from '../../components/Footer.vue';

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      consulta: {},
      dateProrroga: '',
      timeProrroga: '',
      usuario: 0,
      consultor: 0,
      correo: localStorage.getItem("username"),
      consultas: [],
    };
  },
  beforeMount() {
    this.getUser();
  },
  methods: {
    getUser() {
      api.doGet("saps/usuario/getOne/" + this.correo).then((response) => {
        api.doGet('saps/consultor/getOne/usuario/' + response.data.idUsuario).then((response) => {
          this.consultor = response.data.idConsultor
          this.getConsultas(response.data.idConsultor);
        });
      });
    },
    getConsultas(id) {
      api
        .doGet('saps/consulta/getAll/consultor/' + id)
        .then( response => {
          this.consultas = response.data
        })
        .finally(() => (this.loading = false));
    },
    getConsulta(consulta){
      this.consulta = consulta;
    }, 
    finalizarConsulta(consulta){
      consulta.estado = "Terminada"
      consulta.solicitud.estado = "Terminada"
      api
        .doPost('saps/consulta/save', consulta)
        .then(() => {
          api
            .doPost('saps/solicitud/save', consulta.solicitud)
            .then(() => {
              this.getConsultas()
              this.$swal({
                title: 'Consulta finalizada',
                text: "La consulta ha sido finalizada",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              });
            })
            .catch((err) => {
              let errorResponse = err.response.data;
              if (errorResponse.errorExists) {
                this.$swal({
                  title: 'Lo sentimos',
                  text: "Hubo un error al finalizar la consulta",
                  icon: 'error',
                  confirmButtonColor: '#d33',
                  confirmButtonText: 'Aceptar'
                });
              } else {
                this.$swal({
                  title: 'Lo sentimos',
                  text: "Hubo un error en el servidor",
                  icon: 'error',
                  confirmButtonColor: '#d33',
                  confirmButtonText: 'Aceptar'
                });
              }
            })
            .finally(() => (this.loading = false));
      })
    },
    generarProrroga(){
      let dateSolicitud = new Date(this.dateProrroga+" "+this.timeProrroga).toISOString();
      dateSolicitud = dateSolicitud.split('T')[0]

      let prorroga = {
        "idConsulta": this.consulta.idConsulta,
        "fecha": dateSolicitud+'T'+this.timeProrroga,
      }
      api
        .doPost('saps/consulta/save/prorroga', prorroga)
        .then( response => {
          console.log(response.data);
          this.getConsultas(this.consultor)
          this.$swal({
            title: 'Prórroga realizada',
            text: "La prórroga ha sido realizada con éxito",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
        })
        .catch((err) => (console.log(err)))
        .finally(() => (this.loading = false));
    }
  }
};
</script>
<style scoped></style>
