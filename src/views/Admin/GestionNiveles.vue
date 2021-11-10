<template>
  <div class="row">
    <div>
      <HeaderAdmin />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">
            Gestión de niveles académicos
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
            > Registrar nivel académico<b-icon icon="plus" aria-hidden="true"></b-icon>
          </b-button>
        </div>
      </div>
      <!-- Tabla -->
      <div class="row shadow rounded">
        <div class="col-12">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Niveles</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(niveles, item) in listaNiveles"
                :key="niveles.idNivel"
              >
                <th>{{ item + 1 }}</th>
                <td>{{ niveles.nivel }}</td>
                <td>
                  <b-button
                    @click="datosNivel(niveles.idNivel)"
                    type="button"
                    variant="outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editarModal"
                    ><b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  </b-button>
                  <b-button
                    @click="eliminar(niveles.idNivel)"
                    type="button"
                    variant="outline-danger"
                    class="ml-1"
                    ><b-icon icon="trash" aria-hidden="true"></b-icon>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="container" v-if="listaNiveles.length < 1">
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
      <!-- Modal para editar niveles -->
      <div class="modal fade" id="editarModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Editar Niveles Académicos
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
                <label class="float-start">Niveles</label>
                <input
                  v-model="form.nivel"
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
      <!-- Modal para agregar niveles -->
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
                Agregar Nivel Académico
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
                <label class="float-start">Nivel</label>
                <input
                  v-model="form.nivel"
                  type="text"
                  class="form-control"
                  placeholder="Licenciatura"
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
        id: '',
        nivel: '',
      },
      listaNiveles: [],
      nivelEdit: {},
    };
  },
  beforeMount() {
    this.getNiveles();
  },
  computed: {},
  methods: {
    getNiveles() {
      api
        .doGet('saps/nivel/getAll')
        .then((response) => (this.listaNiveles = response.data))
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
        .doPost('saps/nivel/save', this.form)
        .then(() => {
          this.$swal({
            title: 'El nivel se registro exitosamente',
            icon: 'success',
          });
          this.onReset();
          this.getNiveles();
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
        title: '¿Estás seguro de eliminar este nivel?',
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
            .doDelete('saps/nivel/delete/' + id)
            .then(() => {
              this.$swal({
                title: '¡Nivel eliminado exitosamente!',
                icon: 'success',
              });
              this.getNiveles();
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
    datosNivel(id) {
      api
        .doGet('saps/nivel/getOne/' + id)
        .then((response) => {
          console.log('response: ' + response.data);
          this.form.id = response.data.idNivel;
          this.form.nivel = response.data.nivel;
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
      this.nivelEdit = {
        idNivel: this.form.id,
        nivel: this.form.nivel,
      };
      api
        .doPut('saps/nivel/update', this.nivelEdit)
        .then(() => {
          this.$swal({
            title: 'El nivel se ha editado exitosamente',
            icon: 'success',
          });
          this.onReset();
          this.getNiveles();
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
      this.form.nivel = '';
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
