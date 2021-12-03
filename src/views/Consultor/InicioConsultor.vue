<template>
  <div class="row">
    <div><Header /></div>
    <div class="container pt-4">
      <div class="row perfil rounded">
        <div class="col-12 float-start">
          <h4 class="float-start p-1">
            Cosultas
          </h4>
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
                <th scope="col">Nivel Académico</th>
                <th scope="col">Carrera</th>
                <th scope="col">División</th>
                <th scope="col">Fecha</th>
                <th scope="col">Motivo</th>
                <th scope="col">Síntomas</th>
                <th scope="col">Cambiar estado</th>
                <th scope="col">Detalles</th>
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
                <td>Adicciones</td>
                <td>Adicciones</td>
                <td>
                  <button type="button" class="btn btn-success">
                    Asignar
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#detallesModal"
                  >
                    detalles
                  </button>
                </td>
              </tr>
              <!-- Sin datos -->
              <!-- <div class="container" v-if="listaConsultas.length < 1">
                <img
                  src="../../assets/sinDatos.png"
                  style="height: 80px; width: 80px"
                  class="m-2"
                />
                <h3 class="mt-2">
                  Lo sentimos, no hemos podido encontrar datos :(
                </h3>
              </div> -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Modal para editar carreras -->
    <div class="modal fade" id="detallesModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Detalles
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../../components/HeaderConsultor.vue';
export default {
  components: {
    Header,
  },
  data() {
    return {
      listaConsulta: [],
    };
  },
};
</script>
<style scoped></style>
