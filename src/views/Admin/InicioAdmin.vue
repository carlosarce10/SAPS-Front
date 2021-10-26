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
                <th scope="col">Nivel Académico</th>
                <th scope="col">Carrera</th>
                <th scope="col">División</th>
                <th scope="col">Motivo</th>
                <th scope="col">Asignar consultor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Carlos Eduardo Arce de la Torre</td>
                <td>Ingenieria</td>
                <td>DyGS</td>
                <td>DATIC</td>
                <td>Adicciones</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#asignarModal"
                  >
                    Asignar
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>Fernanda Zavala Alpuche</td>
                <td>Ingenieria</td>
                <td>DyGS</td>
                <td>DATIC</td>
                <td>Insomnio y estrés</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#asignarModal"
                  >
                    Asignar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Modalpara asignar consultor -->
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
                Asignar Consultor
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
                <label class="float-start">Nombre del consultor</label>
                <b-form-select
                  required
                  :options="consultores"
                  v-model="form.consultor"
                  class="form-select"
                />
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" class="btn btn-primary">Asignar</button>
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
        consultor: '',
      },
      consultores: [
        { value: 1, text: 'Emmanuel Estrada' },
        { value: 2, text: 'Alan Garcia' },
      ],
    };
  },
  methods: {},
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
