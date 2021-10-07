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
      <div class="row shadow rounded">
        <div class="col-12">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Unidad Administrativa</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Departamento de apoyo psicopedagógico</td>
                <td>
                  <b-button
                    type="button"
                    variant="outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editarModal"
                    ><b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  </b-button>
                  <b-button type="button" variant="outline-danger" class="ml-1"
                    ><b-icon icon="trash" aria-hidden="true"></b-icon>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Modal para editar adtvo -->
      <div class="modal fade" id="editarModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Editar Unidad Administrativa
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit="onSubmit">
                <label class="float-start">Unidad Administrativa</label>
                <input
                  v-model="form.adtvo"
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
              <button type="button" class="btn btn-success">Guardar</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal para agregar adtvo -->
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
                Agregar Unidad Administrativa
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit="onSubmit">
                <label class="float-start">Unidad Administrativa</label>
                <input
                  v-model="form.adtvo"
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
              <button type="button" class="btn btn-success">Guardar</button>
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
export default {
  components: {
    HeaderAdmin,
    Footer,
  },
  data() {
    return {
      form: {
        adtvo: '',
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.perfil {
  background: #00ab84;
  color: white;
}
</style>
