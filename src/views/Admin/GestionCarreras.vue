<template>
  <div class="row">
    <div>
      <HeaderAdmin />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">
            Gestión de carreras
          </h4>
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
      <!-- Tabla carreras -->
      <div class="row shadow rounded">
        <div class="col-12">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Carrera</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(carreras, item) in listaCarreras"
                :key="carreras.idCarrera"
              > 
                <th>{{ item + 1 }}</th>
                <td>{{ carreras.carrera }}</td>
                <td>
                  <b-button
                    @click="datosCarrera(carreras.idCarrera)"
                    type="button"
                    variant="outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editarModal"
                    ><b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  </b-button>
                  <b-button
                    @click="eliminar(carreras.idCarrera)"
                    type="button"
                    variant="outline-danger"
                    class="ml-1"
                    ><b-icon icon="trash" aria-hidden="true"></b-icon>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Modal para editar carreras -->
      <div class="modal fade" id="editarModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Editar Carreras
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
                <label class="float-start">Carreras</label>
                <input
                  v-model="form.carrera"
                  type="text"
                  class="form-control"
                  required
                />
                <label class="float-start">División académica</label>
                <b-form-select 
                  v-model="division" 
                  size="sm" 
                  class="form-select form-select-sm mt-3">
                  <option v-for="div in listaDivisiones" 
                    v-bind:key="div.division"
                    v-bind:value="div.idDivision">
                    {{div.division}}
                   </option>
                </b-form-select>
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
              <button @click="editar()" type="button" class="btn btn-success">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal para agregar carreras -->
      <div
        class="modal fade"
        id="agregarModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Agregar Carrera
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
                <label class="float-start">Carrera</label>
                <input
                  v-model="form.carrera"
                  type="text"
                  class="form-control"
                  required
                />
                <label class="float-start">División académica</label>
                <b-form-select 
                  v-model="division" 
                  size="sm" 
                  class="form-select form-select-sm mt-3">
                  <option v-for="div in listaDivisiones" 
                    v-bind:key="div.division"
                    v-bind:value="div.idDivision">
                    {{div.division}}
                   </option>
                </b-form-select>
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
      form: {
        carrera: '',
      },
      division: '',
      listaCarreras: [],
      carreraEdit: {},
      listaDivisiones: [],
      carreras : {

      }
    };
  },
  beforeMount() {
    this.getCarreras();
    this.getDivisiones();
  },
  computed: {},
  methods: {
    getCarreras() {
      api
        .doGet('saps/carrera/getAll')
        .then((response) => (this.listaCarreras = response.data))
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
    registrar() {
      this.carreras = {carrera: this.form.carrera, division: {idDivision: this.division}}
      api
        .doPost('saps/carrera/save', this.carreras)
        .then(() => {
          
          this.$swal({
            title: 'La carrera se registro exitosamente',
            icon: 'success',
          });
          this.onReset();
          this.getCarreras();
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
    eliminar(id) {
      this.$swal({
        title: '¿Estás seguro de eliminar esta carrera?',
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
            .doDelete('saps/carrera/delete/' + id)
            .then(() => {
              this.$swal({
                title: '¡Carrera eliminada exitosamente!',
                icon: 'success',
              });
              this.getCarreras();
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
    datosCarrera(id) {
      api
        .doGet('saps/carrera/getOne/' + id)
        .then((response) => {
          console.log('response: ' + response.data);
          this.form.id = response.data.idCarrera;
          this.form.carrera = response.data.carrera;
        })
        .catch((error) => {
          let errorResponse = error;
          if (errorResponse.errorExists) {
            this.$swal({
              title: 'Oops! Ha zocurrido un error en el servidor.',
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
      //this.carreras = {carrera: this.form.carrera, division: {idDivision: this.division}}
      this.carreraEdit = {
        idCarrera: this.form.id,
        carrera: this.form.carrera,
        division: {idDivision: this.division}
      };
      api
        .doPut('saps/carrera/update', this.carreraEdit)
        .then(() => {
          this.$swal({
            title: 'La carrera se ha editado exitosamente',
            icon: 'success',
          });
          this.onReset();
          this.getCarreras();
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
    getDivisiones() {
      api
        .doGet('saps/division/getAll')
        .then((response) => (this.listaDivisiones = response.data))
    },
    onReset() {
      this.form.carrera = '';
      this.form.division = '';
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
