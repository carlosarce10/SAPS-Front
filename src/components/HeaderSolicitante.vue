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
        <h3 class="titulo" style="color: white;">SAPS</h3>
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
          alt=""
        />
      </div>
      <div class="offcanvas-body">
        <p>Funciones</p>
      </div>
    </div>
  </div>
</template>
