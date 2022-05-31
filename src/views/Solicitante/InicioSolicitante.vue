<template>
  <div class="row">
    <div>
      <HeaderSolicitante />
    </div>
    <div v-if="this.show.length > 0">
      <div class="container pt-4">
        <div class="row perfil rounded">
          <div class="col-12 float-start">
            <h4 class="float-start p-1">
              Mi Perfil
            </h4>
          </div>
        </div>
      </div>
      <div class="container pt-4">
        <div class="row">
          <div class="col-6">
            <h4>{{ this.nombre }} {{ this.apellidoP }} {{ this.apellidoM }}</h4>
          </div>
          <div class="col-6">
            <h4 v-if="this.tipoUsuario == 'Estudiante'">
              {{ this.matricula }}
            </h4>
            <h4 v-if="this.tipoUsuario == 'Docente'">{{ this.divisionDoc }}</h4>
            <h4 v-if="this.tipoUsuario == 'Administrativo'">
              {{ this.departamento }}
            </h4>
          </div>
        </div>
      </div>
      <div class="container pt-2">
        <!-- Datos Alumno -->
        <div
          class="row  shadow rounded"
          v-if="this.tipoUsuario == 'Estudiante'"
        >
          <div class="col-12">
            <div class="row">
              <div class="col-6 ">
                <h5 class="float-start pt-4">
                  Información Académica
                </h5>
              </div>
              <div class="col-6">
                <b-button
                  class="float-end mt-2"
                  type="button"
                  variant="outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editarModalAlumno"
                  ><b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                </b-button>
              </div>
              <hr />
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">División: </label>
              </div>
              <div class="col-12">
                <label class="float-start"> {{ this.division }}</label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Carrera: </label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.carrera }}</label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Grado:</label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.grado }}</label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Grupo:</label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.grupo }}</label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Tutor:</label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.tutor }}</label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Nivel Académico:</label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.nivel }} </label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Correo electrónico:</label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.correo }}</label>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal para editar Alumno -->
        <div
          class="modal fade"
          id="editarModalAlumno"
          tabindex="-1"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  Editar Información Académica
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <label class="float-start">Grado</label>
                  <input
                    v-model="grado"
                    type="text"
                    class="form-control mb-3"
                  />
                  <label class="float-start">Grupo</label>
                  <input
                    v-model="grupo"
                    type="text"
                    class="form-control mb-3"
                  />
                  <label class="float-start">Tutor</label>
                  <input
                    v-model="tutor"
                    type="text"
                    class="form-control mb-3"
                  />
                  <label class="float-start">Nivel Académico</label>
                  <b-form-select v-model="nivel" class="form-select">
                    <option
                      v-for="niveles in listaNiveles"
                      v-bind:key="niveles.nivel"
                      v-bind:value="niveles.idNivel"
                    >
                      {{ niveles.nivel }}
                    </option></b-form-select
                  >
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
                  @click="editarAlumno()"
                  type="button"
                  class="btn btn-success"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Datos Docente -->
        <div class="row  shadow rounded" v-if="this.tipoUsuario == 'Docente'">
          <div class="col-12 float-start">
            <div class="row">
              <div class="col-6">
                <h6 class="float-start pt-4">
                  Información Académica
                </h6>
              </div>
            </div>
            <hr />
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Correo electrónico:</label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.correo }}</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Datos Administrativo -->
        <div
          class="row  shadow rounded"
          v-if="this.tipoUsuario == 'Administrativo'"
        >
          <div class="col-12">
            <div class="row">
              <div class="col-6">
                <h6 class="float-start pt-4">
                  Información Académica
                </h6>
              </div>
            </div>
            <hr />
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Correo electrónico: </label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.correo }}</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Datos personales -->
        <div class="row  shadow rounded mt-5 mb-5">
          <div class="col-12 float-start">
            <div class="row">
              <div class="col-6">
                <h5 class="float-start pt-4">
                  Información Personal
                </h5>
              </div>
              <div class="col-6">
                <b-button
                  class="float-end mt-2"
                  type="button"
                  variant="outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editarModalDatos"
                  ><b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                </b-button>
              </div>
            </div>
            <hr />
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Edad: </label>
              </div>
              <div class="col-12">
                <label class="float-start"> {{ this.edad }}</label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Domicilio: </label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.domicilio }}</label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Estado civil:</label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.estadoCivil }}</label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Teléfono de apoyo:</label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.tel }}</label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold"
                  >Nombre de persona de apoyo:</label
                >
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.personaApoyo }}</label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold">Parentezco:</label>
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.parentezco }} </label>
              </div>
            </div>
          </div>
          <div class="mb-3 col-4">
            <div class="row">
              <div class="col-12">
                <label class="float-start fw-bold"
                  >Personas con las que vive:</label
                >
              </div>
              <div class="col-12">
                <label class="float-start">{{ this.cantidadPersonas }}</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal para editar datos personales -->
        <div
          class="modal fade"
          id="editarModalDatos"
          tabindex="-1"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  Editar Información Personal
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <label class="float-start">Edad</label>
                  <input v-model="edad" type="text" class="form-control mb-3" />
                  <label class="float-start">Domicilio</label>
                  <input
                    v-model="domicilio"
                    type="text"
                    class="form-control mb-3"
                  />
                  <label class="float-start">Estado civil</label>
                  <b-form-select v-model="estadoCivil" class="form-select">
                    <option
                      v-for="div in listaEstadoCivil"
                      v-bind:key="div.estadoCivil"
                      v-bind:value="div.idEstadoCivil"
                    >
                      {{ div.estadoCivil }}
                    </option>
                  </b-form-select>
                  <label class="float-start">Teléfono de apoyo</label>
                  <input v-model="tel" type="text" class="form-control mb-3" />
                  <label class="float-start">Nombre de persona de apoyo</label>
                  <input
                    v-model="personaApoyo"
                    type="text"
                    class="form-control mb-3"
                  />
                  <label class="float-start">Parentezco</label>
                  <input
                    v-model="parentezco"
                    type="text"
                    class="form-control mb-3"
                  />
                  <label class="float-start">Personas con las que vive</label>
                  <b-form-select
                    required
                    :options="personas"
                    v-model="cantidadPersonas"
                    class="form-select"
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
                <button
                  @click="editarDatos()"
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
    </div>

    <!-- Solicitud -->
    <div
      v-if="this.show.length == 0"
      class="row inicioSesion col-7 position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 rounded"
    >
      <h5 class=" text-muted p-3">
        Estas a un paso de terminar tu registro :)
      </h5>
      <div class="mb-3 col-4">
        <label class="float-start">Edad</label>
        <input
          v-model="edad"
          type="text"
          class="form-control"
          required
          placeholder="23"
        />
      </div>
      <div class="mb-3 col-8">
        <label class="float-start">Domicilio</label>
        <input
          v-model="domicilio"
          type="text"
          class="form-control"
          required
          placeholder="Av. universidad"
        />
      </div>
      <div class="mb-3 col-4">
        <label class="float-start">Estado Civil</label>
        <b-form-select v-model="estadoCivil" class="form-select">
          <option
            v-for="div in listaEstadoCivil"
            v-bind:key="div.estadoCivil"
            v-bind:value="div.idEstadoCivil"
          >
            {{ div.estadoCivil }}
          </option>
        </b-form-select>
      </div>
      <div class="mb-3 col-4">
        <label class="float-start">Nombre de persona de apoyo</label>
        <input
          v-model="personaApoyo"
          type="text"
          class="form-control"
          required
          placeholder="Juan Carlos"
        />
      </div>
      <div class="mb-3 col-4">
        <label class="float-start">Teléfono de persona de apoyo</label>
        <input
          v-model="tel"
          type="text"
          class="form-control"
          required
          placeholder="7771928475"
        />
      </div>
      <div class="mb-3 col-4">
        <label class="float-start">Parentezco de la persona</label>
        <input
          v-model="parentezco"
          type="text"
          class="form-control"
          required
          placeholder="Hermano"
        />
      </div>
      <div class="mb-3 col-4">
        <label class="float-start">Con cuántas personas vive</label>
        <b-form-select
          required
          :options="personas"
          v-model="cantidadPersonas"
          class="form-select"
        />
      </div>
      <div class="mt-4 col-4">
        <button
          type="submit"
          @click="registroSolicitante()"
          class="btn btn-primary m-1 float-end"
        >
          Registrarme
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSolicitante from '../../components/HeaderSolicitante.vue';
import api from '../../util/api';
export default {
  components: {
    HeaderSolicitante,
  },
  data() {
    return {
      nombre: '',
      apellidoP: '',
      apellidoM: '',
      tipoUsuario: '',
      correo: '',
      division: '',
      carrera: '',
      grado: '',
      grupo: '',
      tutor: '',
      nivel: '',
      matricula: '',
      listaEstadoCivil: [],
      estadoCivil: '',
      divisionDoc: '',
      departamento: '',
      solicitud: '',
      formSolicitud: {},
      formSolicitante: {},
      edad: '',
      domicilio: '',
      tel: '',
      personaApoyo: '',
      parentezco: '',
      cantidadPersonas: '',
      idUsuario: '',
      alumnoEdit: {},
      show: '',
      listaNiveles: [],
      idAlumno: '',
      idCarrera: '',
      idDocente: '',
      idAdministrativo: '',
      idSolicitante: '',
      personas: [
        { value: 1, text: '1' },
        { value: 2, text: '2' },
        { value: 3, text: '3' },
        { value: 4, text: '4' },
        { value: 5, text: '5' },
        { value: 6, text: 'Más de 5' },
      ],
      /* estadosCiviles: [
        { value: 1, text: 'Casado(a)' },
        { value: 2, text: 'Soltero(a)' },
        { value: 3, text: 'Viudo(a)' },
      ], */
    };
  },
  beforeMount() {
    this.correo = localStorage.getItem('username');
    this.getUser();
    this.getSolicitante();
    this.getNiveles();
    this.getEstadoCivil();
  },
  methods: {
    getUser() {
      api.doGet('saps/usuario/getOne/' + this.correo).then((response) => {
        this.idUsuario = response.data.idUsuario;
        this.tipoUsuario = response.data.tipoUsuario.tipoUsuario;
        this.nombre = response.data.nombre;
        this.apellidoP = response.data.apellidoPaterno;
        this.apellidoM = response.data.apellidoMaterno;
        if (this.tipoUsuario == 'Estudiante') {
          this.division =
            response.data.tipoUsuario.solicitudEstudiante.carrera.division.division;
          this.grado = response.data.tipoUsuario.solicitudEstudiante.grado;
          this.grupo = response.data.tipoUsuario.solicitudEstudiante.grupo;
          this.tutor = response.data.tipoUsuario.solicitudEstudiante.tutor;
          this.nivel =
            response.data.tipoUsuario.solicitudEstudiante.nivelEstudio.nivel;
          this.matricula =
            response.data.tipoUsuario.solicitudEstudiante.matricula;
          this.carrera =
            response.data.tipoUsuario.solicitudEstudiante.carrera.carrera;
          this.idCarrera =
            response.data.tipoUsuario.solicitudEstudiante.carrera.idCarrera;
          this.idAlumno =
            response.data.tipoUsuario.solicitudEstudiante.idSolicitudEstudiante;
        } else if (this.tipoUsuario == 'Docente') {
          this.divisionDoc =
            response.data.tipoUsuario.solicitudDocente.division.division;
        } else if (this.tipoUsuario == 'Administrativo') {
          this.departamento =
            response.data.tipoUsuario.solicitudAdministrativo.departamento.departamento;
        }
        this.getSolicitante(this.idUsuario);
      });
    },
    registroSolicitante() {
      this.formSolicitud = {
        usuario: {
          idUsuario: this.idUsuario,
        },
        edad: this.edad,
        domicilio: this.domicilio,
        estadoCivil: {
          idEstadoCivil: this.estadoCivil,
        },
        telefonoApoyo: this.tel,
        nombreApoyo: this.personaApoyo,
        parentezcoApoyo: this.parentezco,
        personasVivienda: this.cantidadPersonas,
      };
      api
        .doPost('saps/solicitante/save', this.formSolicitud)
        .then(() => {
          this.$swal({
            title: 'Se registro exitosamente',
            icon: 'success',
          });
          this.$router.go();
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
    getSolicitante(id) {
      api
        .doGet('saps/solicitante/getAll/usuario/' + id)
        .then(
          (response) => (
            (this.idSolicitante = response.data[0].idSolicitante),
            (this.show = response.data),
            (this.edad = response.data[0].edad),
            (this.domicilio = response.data[0].domicilio),
            (this.estadoCivil = response.data[0].estadoCivil.estadoCivil),
            (this.tel = response.data[0].telefonoApoyo),
            (this.personaApoyo = response.data[0].nombreApoyo),
            (this.parentezco = response.data[0].parentezcoApoyo),
            (this.cantidadPersonas = response.data[0].personasVivienda)
          )
        )
        .then(() => console.log(this.show));
    },
    editarAlumno() {
      this.alumnoEdit = {
        idSolicitudEstudiante: this.idAlumno,
        nivelEstudio: {
          idNivel: this.nivel,
        },
        matricula: this.matricula,
        carrera: {
          idCarrera: this.idCarrera,
        },
        grado: this.grado,
        grupo: this.grupo,
        tutor: this.tutor,
      };
      api
        .doPut('saps/solicitud/estudiante/update', this.alumnoEdit)
        .then(() => {
          this.$swal({
            title: 'Se modificaton los datos exitosamente',
            icon: 'success',
          });
          this.$router.go();
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
    getNiveles() {
      api
        .doGet('saps/nivel/getAll')
        .then((response) => (this.listaNiveles = response.data));
    },
    getEstadoCivil() {
      api
        .doGet('saps/estadoCivil/getAll')
        .then((response) => (this.listaEstadoCivil = response.data))
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
    editarDatos() {
      this.formSolicitante = {
        idSolicitante: this.idSolicitante,
        usuario: {
          idUsuario: this.idUsuario,
        },
        edad: this.edad,
        domicilio: this.domicilio,
        estadoCivil: {
          idEstadoCivil: this.estadoCivil,
        },
        telefonoApoyo: this.tel,
        nombreApoyo: this.personaApoyo,
        parentezcoApoyo: this.parentezco,
        personasVivienda: this.cantidadPersonas,
      };
      api
        .doPut('saps/solicitante/update', this.formSolicitante)
        .then(() => {
          this.$swal({
            title: 'Se modificaton los datos exitosamente',
            icon: 'success',
          });
          this.$router.go();
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
  },
};
</script>

<style scoped>
.perfil {
  background: #00ab84;
  color: white;
}
</style>
