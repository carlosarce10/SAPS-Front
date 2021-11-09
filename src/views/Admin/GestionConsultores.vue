<template>
  <div class="row">
    <div>
      <HeaderAdmin />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">Gestión de consultores</h4>
        </div>
      </div>
    </div>
    <div class="container pt-2">
      <div class="row">
        <div class="col-12">
          <b-button
            class="float-start mb-2"
            type="button"
            variant="outline-success"
            data-bs-toggle="modal"
            data-bs-target="#agregarModal"
            ><b-icon icon="plus" aria-hidden="true"></b-icon>
          </b-button>
        </div>
      </div>
      <!-- Tabla consultores -->
      <div class="row shadow rounded">
        <div class="col-12">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cédula</th>
                <th scope="col">Puesto</th>
                <th scope="col">Correo</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(consultores, item) in listaConsultor"
                :key="consultores.idConsultor"
              >
                <th>{{ item + 1 }}</th>
                <td>
                  {{
                    consultores.usuario.nombre +
                      ' ' +
                      consultores.usuario.apellidoPaterno +
                      ' ' +
                      consultores.usuario.apellidoMaterno
                  }}
                </td>
                <td>{{ consultores.cedula }}</td>
                <td>{{ consultores.puesto }}</td>
                <td>{{ consultores.correoPersonal }}</td>
                <td>
                  <b-button
                    @click="datosConsultor(consultores.idConsultor)"
                    type="button"
                    variant="outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editarModal"
                    ><b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  </b-button>
                  <b-button
                    @click="eliminar(consultores.idConsultor)"
                    type="button"
                    variant="outline-danger"
                    class="ml-1"
                    ><b-icon icon="trash" aria-hidden="true"></b-icon>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="container" v-if="listaConsultor.length < 1">
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
      <!-- Modal para editar consultores -->
      <div class="modal fade" id="editarModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Editar consultores</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div
                class="row inicioSesion col-6 position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 rounded"
              >
                <form>
                  <label class="float-start">Cédula</label>
                  <input
                    v-model="formConsultor.cedula"
                    type="text"
                    class="form-control"
                    required
                  />
                  <label class="float-start">Correo Personal</label>
                  <input
                    v-model="formConsultor.correoPersonal"
                    type="text"
                    class="form-control"
                    required
                  />
                  <label class="float-start">Puesto</label>
                  <input
                    v-model="formConsultor.puesto"
                    type="text"
                    class="form-control"
                    required
                  />
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button @click="editar()" type="button" class="btn btn-success">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal para los registros -->
      <div
        class="modal fade"
        id="agregarModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Registro de consultores</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Registro datos genericos -->
              <form @submit="onSubmit">
                <div class="row">
                  <div class="mb-3 col-4">
                    <label class="float-start">Nombre(s)</label>
                    <input
                      v-model="form.nombre"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="mb-3 col-4">
                    <label class="float-start">Apellido Paterno</label>
                    <input
                      v-model="form.apellidoP"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="mb-3 col-4">
                    <label class="float-start">Apellido Materno</label>
                    <input
                      v-model="form.apellidoM"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="mb-3 col-4">
                    <label class="float-start">Correo electrónico</label>
                    <input
                      v-model="form.correo"
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
                      v-model="form.sexo"
                      class="form-select"
                    />
                  </div>
                  <div class="mb-3 col-4">
                    <label class="float-start">Contraseña</label>
                    <input
                      v-model="form.contrasenia"
                      type="password"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <button
                        type="submit"
                        class="btn btn-primary mb-3 float-end"
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <!-- Agregar consultores -->
              <form>
                <div class="row">
                  <div class="mb-3 col-4">
                    <label class="float-start">Cedula</label>
                    <input
                      v-model="formConsultor.cedula"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="mb-3 col-4">
                    <label class="float-start">Correo Personal</label>
                    <input
                      v-model="formConsultor.correoPersonal"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="mb-3 col-4">
                    <label class="float-start">Puesto</label>
                    <input
                      v-model="formConsultor.puesto"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <button
                        type="submit"
                        class="btn btn-primary mb-3 float-end"
                        @click="registrar()"
                      >
                        Registrar
                      </button>
                    </div>
                  </div>
                </div>
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
              <button
                @click="registrar()"
                type="button"
                class="btn btn-success"
              >
                Guardar
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
import api from '../../util/api';

export default {
  components: {
    HeaderAdmin,
    Footer,
  },
  data() {
    return {
      formConsultor: {
        id: '',
        cedula: '',
        correoPersonal: '',
        puesto: '',
      },
      form: {
        nombre: '',
        apellidoP: '',
        apellidoM: '',
        correo: '',
        contrasenia: '',
        sexo: '',
      },
      listaConsultor: [],
      consultorEdit: {},
      id: '',
      sexos: [
        { value: 1, text: 'Hombre' },
        { value: 2, text: 'Mujer' },
        { value: 3, text: 'No binario' },
      ],
    };
  },
  beforeMount() {
    this.getConsultores();
  },
  computed: {},
  methods: {
    getConsultores() {
      api
        .doGet('saps/consultor/getAll')
        .then((response) => {
          this.listaConsultor = response.data;
          console.log(response.data);
        })

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
    eliminar(id) {
      this.$swal({
        title: '¿Estás seguro de eliminar este consultor?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#00ab84',
        cancelButtonColor: '#cf2115',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doDelete('saps/consultor/delete/' + id)
            .then(() => {
              this.$swal({
                title: '¡Consultor eliminado exitosamente!',
                icon: 'success',
              });
              this.getConsultores();
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
            })
            .finally(() => (this.loading = false));
        }
      });
    },
    datosConsultor(id) {
      api
        .doGet('saps/consultor/getOne/' + id)
        .then((response) => {
          console.log('response: ' + response.data);
          this.formConsultor.id = response.data.idConsultor;
          this.formConsultor.cedula = response.data.cedula;
          this.formConsultor.correoPersonal = response.data.correoPersonal;
          this.formConsultor.puesto = response.data.puesto;
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
    editar() {
      this.consultorEdit = {
        id: this.formConsultor.idConsultor,
        cedula: this.formConsultor.cedula,
        correoPersonal: this.formConsultor.correoPersonal,
        puesto: this.formConsultor.puesto,
      };
      api
        .doPut('saps/consultor/update', this.consultorEdit)
        .then(() => {
          this.$swal({
            title: 'El consultor se ha editado exitosamente',
            icon: 'success',
          });
          this.onResetC();
          this.getConsultores();
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
    onSubmit(e) {
      this.form = {
        nombre: this.form.nombre,
        apellidoPaterno: this.form.apellidoP,
        apellidoMaterno: this.form.apellidoM,
        correo: this.form.correo,
        password: this.form.contrasenia,
        sexo: this.form.sexo,
      };
      api
        .doPost('auth/register/consultor', this.form)
        .then((response) => {
          this.id = response.data;
          console.log(response.data);
        })
        .then(() => {
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
      e.preventDefault();
    },
    registrar() {
      //resgistro del consultor
      console.log('ID --> ' + this.id);
      this.formConsultor = {
        cedula: this.formConsultor.cedula,
        correoPersonal: this.formConsultor.correoPersonal,
        puesto: this.formConsultor.puesto,
        usuario: {
          idUsuario: this.id,
        },
      };
      api
        .doPost('saps/consultor/save', this.formConsultor)
        .then(() => {
          this.$swal({
            title: 'El consultor se registro exitosamente',
            icon: 'success',
          });
          this.onResetC();
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
    onReset() {
      this.form.nombre = '';
      this.form.apellidoP = '';
      this.form.apellidoM = '';
      this.form.correo = '';
      this.form.contrasenia = '';
      this.form.sexo = '';
    },
    onResetC() {
      this.formConsultor.cedula = '';
      this.formConsultor.correoPersonal = '';
      this.formConsultor.puesto = '';
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
