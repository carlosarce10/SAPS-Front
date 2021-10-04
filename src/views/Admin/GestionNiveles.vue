<template>
  <div class="row">
    <div>
      <HeaderInicio /> 
    </div>
        <div style="height: 50px;">
            <h3>Gestión de niveles académicos</h3>
        </div>    
    <div style="height: 60px;" class="container center-h center-v" id="botonModalRegistro">
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#registrarNivelModal">Registrar nivel académico</button>
    </div>

     <div id="divTablaNiveles" class="container center-h center-v" >
        <table class="table">
          <thead class="table-light">
            <tr>  
              <th scope="col">#</th>
              <th scope="col">Nivel académico</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>TSU</td>
              <td>
                <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editarNivelModal">Editar</button>
              </td>
              <td>
                <button type="button" class="btn btn-danger">Eliminar</button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>ING</td>
              <td>
                <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editarNivelModal">Editar</button>
              </td>
              <td>
                <button type="button" class="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Modal de registro de nivel -->
        <div class="modal fade" id="registrarNivelModal" tabindex="-1" aria-labelledby="registrarNivelModal" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="registrarNivelModalLabel">Registro de nuevo nivel académico</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit="onSubmit">
                  <label class="float-start">Nuevo nivel académico</label>
                  <input type="text" class="form-control" id="nuevoNivel">
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" >Registrar</button>
              </div>
            </div>
          </div>
        </div> <!-- Termina modal de registro de niveles-->
        <!-- Modal de registro de niveles -->
        <div class="modal fade" id="editarNivelModal" tabindex="-1" aria-labelledby="editarNivelModal" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editarNivelLabel">Editar nivel académico</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit="onSubmit">
                  <label class="float-start">Nivel académico</label>
                  <input type="text" class="form-control" id="editNivel">
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" >Editar</button>
              </div>
            </div>
          </div>
        </div> <!-- Termina modal de editar nivel-->
    <Footer class="fixed-bottom" />
  </div>
</template>

<script>
import HeaderInicio from '../../components/HeaderInicio.vue';
import Footer from '../../components/Footer.vue';
export default {
  components: {
    HeaderInicio,
    Footer,
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style scoped>

#divTablaNiveles{
    width: 850px;
}

.center-h {
  justify-content: center;
}

.center-v {
  align-items: center;
}
</style>
