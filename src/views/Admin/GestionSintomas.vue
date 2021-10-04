<template>
  <div class="row">
    <div>
      <HeaderInicio /> 
    </div>
        <div style="height: 50px;">
            <h3>Gestión de síntomas</h3>
        </div>    
    <div style="height: 60px;" class="container center-h center-v" id="botonModalRegistro">
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#registrarSintomaModal">Registrar sintoma</button>
    </div>

     <div id="divTablaSintomas" class="container center-h center-v" >
        <table class="table">
          <thead class="table-light">
            <tr>  
              <th scope="col">#</th>
              <th scope="col">Sintoma</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Ansiedad</td>
              <td>
                <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editarSintomaModal">Editar</button>
              </td>
              <td>
                <button type="button" class="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Modal de registro de sintomas -->
        <div class="modal fade" id="registrarSintomaModal" tabindex="-1" aria-labelledby="registrarSintomaModal" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="registrarSintomaModalLabel">Registro de nuevo síntoma</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit="onSubmit">
                  <label class="float-start">Nuevo sintoma</label>
                  <input type="text" class="form-control" id="nuevoSintoma">
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" >Registrar</button>
              </div>
            </div>
          </div>
        </div> <!-- Termina modal de registro de sintomas-->
        <!-- Modal de editar sintomas -->
        <div class="modal fade" id="editarSintomaModal" tabindex="-1" aria-labelledby="editarSintomaModal" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editarSintomaLabel">Editar síntoma</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit="onSubmit">
                  <label class="float-start">Sintoma</label>
                  <input type="text" class="form-control" id="editSintoma">
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" >Editar</button>
              </div>
            </div>
          </div>
        </div> <!-- Termina modal de editar sintomas-->
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

#divTablaSintomas{
    width: 850px;
}

.center-h {
  justify-content: center;
}

.center-v {
  align-items: center;
}
</style>
