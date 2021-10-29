<template>
  <div class="row">
    <div>
      <HeaderAdmin />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">
            Gestión de unidades administrativas
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
      <!-- Tabla de unidades administrativas -->
      <div class="row shadow rounded">
        <div class="col-12">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Unidades Administrativas</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(departamentos, item) in listaDepartamentos"
                :key="departamentos.idDepartamento"
              >
                <th>{{ item + 1 }}</th>
                <td>{{ departamentos.departamento }}</td>
                <td>
                  <b-button
                    @click="datosDepartamento(departamentos.idDepartamento)"
                    type="button"
                    variant="outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editarModal"
                    ><b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  </b-button>
                  <b-button
                    @click="eliminar(departamentos.idDepartamento)"
                    type="button"
                    variant="outline-danger"
                    class="ml-1"
                    ><b-icon icon="trash" aria-hidden="true"></b-icon>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="container" v-if="listaDepartamentos.length < 1">
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
      <!-- Modal para editar departamentos -->
      <div class="modal fade" id="editarModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Editar Unidades Administrativas
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
                <label class="float-start">Unidades Administrativas</label>
                <input
                  v-model="form.departamento"
                  type="text"
                  class="form-control"
                  required
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
              <button @click="editar()" type="button" class="btn btn-success">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal para agregar departamentos -->
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
                Agregar Unidades Administrativas
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
                <label class="float-start">Unidad Administrativa</label>
                <input
                  v-model="form.departamento"
                  type="text"
                  class="form-control"
                  required
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
        departamento: '',
      },
      listaDepartamentos: [],
      departamentoEdit: {},
    };
  },
  beforeMount() {
    this.getDepartamentos();
  },
  computed: {},
  methods: {
    getDepartamentos() {
      api
        .doGet('saps/departamento/getAll')
        .then((response) => (this.listaDepartamentos = response.data))
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
      api
        .doPost('saps/departamento/save', this.form)
        .then(() => {
          this.$swal({
            title: 'La unidad administrativa se registro exitosamente',
            icon: 'success',
          });
          this.onReset();
          this.getDepartamentos();
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
        title: '¿Estás seguro de eliminar esta unidad administrativa?',
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
            .doDelete('saps/departamento/delete/' + id)
            .then(() => {
              this.$swal({
                title: '¡Unidad administrativa eliminada exitosamente!',
                icon: 'success',
              });
              this.getDepartamentos();
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
    datosDepartamento(id) {
      api
        .doGet('saps/departamento/getOne/' + id)
        .then((response) => {
          console.log('response: ' + response.data);
          this.form.id = response.data.idDepartamento;
          this.form.departamento = response.data.departamento;
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
      this.departamentoEdit = {
        idDepartamento: this.form.id,
        departamento: this.form.departamento,
      };
      api
        .doPut('saps/departamento/update', this.departamentoEdit)
        .then(() => {
          this.$swal({
            title: 'La unidad administrativa se ha editado exitosamente',
            icon: 'success',
          });
          this.onReset();
          this.getDepartamentos();
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
      this.form.departamento = '';
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
