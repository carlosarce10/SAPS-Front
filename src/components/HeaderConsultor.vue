<template>
  <div class="header">
    <div class="row">
      <div class="col-1">
        <b-button
          variant="btn-outline"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBackdrop"
          aria-controls="offcanvasWithBackdrop"
        >
          <b-icon icon="list" variant="light" font-scale="2"></b-icon>
        </b-button>
      </div>
      <div class="col-1 offset-10">
        <div class="vertical-line"></div>
        <h3 class="titulo" style="color: white; margin-top: 10px;">SAPS</h3>
      </div>
    </div>
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasWithBackdrop"
      aria-labelledby="offcanvasWithBackdropLabel"
    >
      <div class="offcanvas-header">
        <img
          src="../assets/logoApoyo.png"
          style="height: 60px; width: 300px;"
        />
      </div>
      <hr />
      <div class="offcanvas-body">
        <div class="d-grid gap-2 col-9 mx-auto">
          <b-button variant="outline-success"
            ><b-icon
              class="float-start"
              icon="calendar3"
              aria-hidden="true"
            ></b-icon>
            Consulta de sesiones</b-button
          >
          <b-button variant="outline-success"
            ><b-icon
              class="float-start"
              icon="card-checklist"
              aria-hidden="true"
            ></b-icon>
            Bitácora de consultas</b-button
          >
        </div>
      </div>
      <hr />
      <div class="p-3 mb-2">
        <b-button variant="outline-success"
          ><b-icon class="float-start" icon="lock" aria-hidden="true"></b-icon>
          Cerrar sesión</b-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.vertical-line {
  width: 1px;
  background-color: white;
  height: 100%;
  float: left;
}
</style>
