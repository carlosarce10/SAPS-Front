<template>
  <div class="row">
    <div>
      <HeaderAdmin />
    </div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">
            Gestión de síntomas
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
      <!-- Tabla síntomas -->
      <div class="row shadow rounded">
        <div class="col-12">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Síntomas</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(sintomas, item) in listaSintomas"
                :key="sintomas.idSintoma"
              >
                <th>{{ item + 1 }}</th>
                <td>{{ sintomas.sintoma }}</td>
                <td>
                  <b-button
                    @click="datosSintoma(sintomas.idSintoma)"
                    type="button"
                    variant="outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editarModal"
                    ><b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  </b-button>
                  <b-button
                    @click="eliminar(sintomas.idSintoma)"
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
      <!-- Modal para editar los síntomas -->
      <div class="modal fade" id="editarModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Editar Síntoma
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
                <label class="float-start">Síntomas</label>
                <input
                  v-model="form.sintoma"
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
      <!-- Modal para agregar sintomas -->
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
                Agregar Síntomas
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
                <label class="float-start">Síntomas</label>
                <input
                  v-model="form.sintoma"
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
        sintoma: '',
      },
      listaSintomas: [],
      sintomaEdit: {},
    };
  },
  beforeMount() {
    this.getSintomas();
  },
  computed: {},
  methods: {
    getSintomas() {
      api
        .doGet('saps/sintoma/getAll')
        .then((response) => (this.listaSintomas = response.data))
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
        .doPost('saps/sintoma/save', this.form)
        .then(() => {
          this.$swal({
            title: 'El síntoma se registro exitosamente',
            icon: 'success',
          });
          this.onReset();
          this.getSintomas();
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
        title: '¿Estás seguro de eliminar este síntoma?',
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
            .doDelete('saps/sintoma/delete/' + id)
            .then(() => {
              this.$swal({
                title: '¡Síntoma eliminado exitosamente!',
                icon: 'success',
              });
              this.getSintomas();
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
    datosSintoma(id) {
      api
        .doGet('saps/sintoma/getOne/' + id)
        .then((response) => {
          console.log('response: ' + response.data);
          this.form.id = response.data.idSintoma;
          this.form.sintoma = response.data.sintoma;
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
      this.sintomaEdit = {
        idSintoma: this.form.id,
        sintoma: this.form.sintoma,
      };
      api
        .doPut('saps/sintoma/update', this.sintomaEdit)
        .then(() => {
          this.$swal({
            title: 'El síntoma se ha editado exitosamente',
            icon: 'success',
          });
          this.onReset();
          this.getSintomas();
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
      this.form.sintoma = '';
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
