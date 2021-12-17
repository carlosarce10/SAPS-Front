<template>
  <div class="row">
    <div>
      <HeaderAdmin />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">
            Solicitudes para el apoyo psicopedagógico
          </h4>
        </div>
      </div>
    </div> 
    <div class="container pt-4">
      <div class="row shadow rounded">
        <div class="col-12">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre completo</th>
                <th scope="col">Tipo de usuario</th>
                <th scope="col">Estado</th>
                <th scope="col">Correo</th>
                <!--<th scope="col">Sintomas</th>-->
                <th scope="col">Consultor</th>
                <th scope="col">Enviar correo</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(solicitud, item) in solicitudes"
                :key="solicitud.idSolicitud"
              >
                <th scope="row">{{ item + 1 }}</th>
                <td>{{ solicitud.solicitante.usuario.nombre + ' ' + solicitud.solicitante.usuario.apellidoPaterno + ' ' + solicitud.solicitante.usuario.apellidoMaterno }}</td>
                <td>{{ solicitud.solicitante.usuario.tipoUsuario.tipoUsuario }}</td>
                  <td v-if= "solicitud.estado === 'Pendiente'" style="color: red">
                    <span class="badge bg-danger" @click="changeStatus(solicitud, null)" style="cursor: pointer;">{{ solicitud.estado }}</span>
                  </td>
                  <td v-else style="color: green">
                    <span class="badge bg-success" @click="changeStatus(solicitud, null)" style="cursor: pointer;">{{ solicitud.estado }}</span>
                  </td>
                <td>{{ solicitud.solicitante.usuario.correo }}</td>
                <!--<td>{{ solicitud.sintomas }}</td>-->
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    @click="verificarConsultor(solicitud)"
                    data-bs-toggle="modal"
                    data-bs-target="#verificarModal"
                    v-if= "solicitud.consultor != null"
                  >
                    Verificar
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="getSolicitud(solicitud)"
                    data-bs-toggle="modal"
                    data-bs-target="#asignarModal"
                    v-else
                  >
                    Asignar
                  </button>
                </td>
                <td>
                  <b-button variant="secondary"
                    disabled
                    type="button"
                    v-if= "solicitud.estado != 'Asignada'"
                  >
                    <b-icon icon="envelope-fill" aria-hidden="true" ></b-icon>
                  </b-button>
                  <b-button variant="secondary"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#correoModal"
                    @click="getCorreo(solicitud.solicitante.usuario.correo, solicitud.idSolicitud)"
                    v-else
                  >
                    <b-icon icon="envelope-fill" aria-hidden="true"></b-icon>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Modal para asignar consultor -->
      <div
        class="modal fade"
        id="asignarModal"
        tabindex="-1"
        aria-labelledby="asignarModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="asignarModalLabel">
                Asignar consultor
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="float-start">Consultores</label>
                <b-form-select required v-model="consultorSelected" class="form-select">
                  <option value="">Elige una opción</option>
                  <option
                    v-for="consultor in consultores"
                    v-bind:key="consultor.consultor"
                    v-bind:value="consultor.idConsultor"
                  >
                    {{ consultor.usuario.nombre + ' ' + consultor.usuario.apellidoPaterno + ' ' + consultor.usuario.apellidoMaterno }}
                  </option>
                </b-form-select>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" class="btn btn-primary" @click="asignarConsultor(solicitud)" data-bs-dismiss="modal">Asignar</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal para verificar consultor -->
      <div
        class="modal fade"
        id="verificarModal"
        tabindex="-1"
        aria-labelledby="verificarModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="verificarModalLabel">
                Verificar consultor
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card border-success mb-3">
                      <div class="card-body">
                          <span>Consultor elegido: <b>{{ this.namePerson }}</b></span>
                          <br>
                          Fecha seleccionada: 
                          <span><b>{{ this.fechaSelected }}</b></span>
                          <hr>
                          <div class="d-grid gap-2" v-if="this.solicitud.estado === 'Pendiente'">
                            <button class="btn btn-success" type="button" @click="generarConsulta(solicitud)" data-bs-dismiss="modal">Generar consulta</button>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-md-12">
                    <div class="card border-warning mb-3">
                      <div class="card-body">
                        <h5 class="card-title">Asignar nuevo consultor</h5>
                        <label class="float-start mb-2">Consultores</label>
                        <b-form-select required v-model="consultorSelected" class="form-select">
                          <option value="">Elige una opción</option>
                          <template  v-if="consultorSelected != null">
                            <option
                              v-for="consultor in consultoresFilter"
                              v-bind:key="consultor.consultor"
                              v-bind:value="consultor.idConsultor"
                            >
                              {{ consultor.usuario.nombre + ' ' + consultor.usuario.apellidoPaterno + ' ' + consultor.usuario.apellidoMaterno }}
                            </option>
                          </template>
                          <template v-else>
                            <option
                              v-for="consultor in consultores"
                              v-bind:key="consultor.consultor"
                              v-bind:value="consultor.idConsultor"
                            >
                              {{ consultor.usuario.nombre + ' ' + consultor.usuario.apellidoPaterno + ' ' + consultor.usuario.apellidoMaterno }}
                            </option>
                          </template>
                        </b-form-select>
                        <div class="d-grid gap-2">
                            <button type="button" class="btn btn-warning float-start mt-3" @click="asignarConsultor(solicitud)" data-bs-dismiss="modal">Asignar</button>
                        </div>
                      </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal para enviar correo -->
      <div
        class="modal fade"
        id="correoModal"
        tabindex="-1"
        aria-labelledby="correoModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="correoModalLabel">
                Enviar enlace Meet
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <button class="btn btn-success" type="button" id="button-addon1"><b-icon icon="person" aria-hidden="true"></b-icon></button>
                <input type="text"  v-model="destinatario" class="form-control" placeholder="Ingresa un correo electronico" aria-describedby="button-addon1">
              </div>
              <div class="input-group mb-3">
                <button class="btn btn-dark" type="button" id="button-addon2"><b-icon icon="link" aria-hidden="true"></b-icon></button>
                <input type="text" v-model="enlaceMeet" class="form-control" placeholder="Ingresa el enlace Meet" aria-describedby="button-addon2">
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                @click="sendMail(destinatario, enlaceMeet)"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer class="fixed-bottom" />
  </div>
</template>

<script>
import HeaderAdmin from '../../components/HeaderAdmin.vue';
import Footer from '../../components/Footer.vue';
import api from "../../util/api.js";

export default {
  components: {
    HeaderAdmin,
    Footer,
  },
  data() {
    return {
      consultor: '',
      namePerson: '',
      consultorSelected: '',
      fechaSelected: '',
      destinatario: '',
      solicitudEmail: '',
      enlaceMeet: '',
      solicitud: {},
      solicitudes: [],
      consultores: [],
      consultoresFilter: []
    };
  },
  beforeMount() {
    this.getSolicitudes();
    this.getConsultores();
  },
  methods: {
    getSolicitudes() {
      api
        .doGet('saps/solicitud/getAll')
        .then((response) => (this.solicitudes = response.data))
        .catch((err) => {
          let errorResponse = err.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: 'Oops! Ha ocurrido un error en el servidor.',
              icon: 'error',
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
    },
    getConsultores() {
      api
        .doGet('saps/consultor/getAll')
        .then((response) => {
          this.consultores = response.data
          this.consultoresFilter = response.data
        })
        .catch((err) => {
          let errorResponse = err.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: 'Oops! Ha ocurrido un error en el servidor.',
              icon: 'error',
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
    },
    getSolicitud(solicitud){
      this.solicitud = solicitud
    },
    changeStatus(solicitud, consultor) {
      console.log(solicitud+''+consultor);
      /*if (solicitud.estado === 'Pendiente') {
        solicitud.estado = "Asignada";
      } else {
        solicitud.estado = "Pendiente";
      }

      if (consultor != null) {
        solicitud.consultor = consultor;
      }
      api
        .doPost('saps/solicitud/save', solicitud)
        .then(() => {
          this.$swal({
            title: 'Solicitud modificada',
            text: "El estado de la solicitud ha sido modificado",
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
              text: "Hubo un error al registrar la solicitud",
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
        .finally(() => (this.loading = false));*/
    },
    verificarConsultor(solicitud) {
      this.solicitud = solicitud
      this.consultoresFilter = this.consultores.filter(c => c.idConsultor != solicitud.consultor.idConsultor)
      this.namePerson = solicitud.consultor.usuario.nombre + " " + solicitud.consultor.usuario.apellidoPaterno + " " + solicitud.consultor.usuario.apellidoMaterno
      this.fechaSelected = solicitud.fecha;
    },
    asignarConsultor(solicitud) {
      if (this.consultorSelected != null) {
        this.solicitud = solicitud
        solicitud.consultor.idConsultor = this.consultorSelected

        if (this.solicitud.estado === "Pendiente") {
            this.solicitud.estado = "Asignada"
            this.generarConsulta()
        }
        
        api
          .doPost('saps/solicitud/save', solicitud)
          .then(() => {
            this.$swal({
              title: 'Solicitud modificada',
              text: "El consultor ha sido asignado correctamente",
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
                text: "Hubo un error al modificar la solicitud",
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
          .finally(() => (this.getSolicitudes()));
      } else {
        this.$swal({
              title: 'Favor de seleccionar un consultor',
              text: "Es necesario llenar todos los campos",
              icon: 'warning',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            });
      }
    },
    generarConsulta(){
      let consulta = {
        fecha: new Date().toISOString(),
        estado: 'Pendiente',
        consultor: {
          idConsultor: this.solicitud.consultor.idConsultor
        },
        solicitud: {
          idSolicitud: this.solicitud.idSolicitud
        }
      }

      api
        .doPost('saps/consulta/save', consulta)
        .then(() => {
          this.getSolicitudes()
          this.$swal({
            title: 'Consulta generada',
            text: "La consulta ha sido generada correctamente",
            icon: 'success',
          })
      })
    },
    getCorreo(mail, solicitud) {
      this.destinatario = mail;
      this.solicitudEmail = solicitud;
    }, 
    sendMail(destino, enlace) {
      let mail = {
        "to": destino,
        "linkCall": enlace,
        "idConsulta": this.solicitudEmail
      }
      api
        .doPost('saps/mail/send', mail)
        .then(() => {
          this.$swal({
            title: 'Correo enviado',
            text: "El enlace Meet ha sido enviado correctamente",
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
              text: "Hubo un error al enviar el correo",
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
    }
  },
};
</script>

<style scoped>
#divTabla {
  width: 850px;
}

.center-h {
  justify-content: center;
}

.center-v {
  align-items: center;
}
.perfil {
  background: #00ab84;
  color: white;
}
</style>
