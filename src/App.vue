<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.row {
  --bs-gutter-x: 0rem !important;
  margin-left: 0rem !important;
  margin-right: 0rem !important;
}
.header {
  background: #002e5d;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 1%;
  padding-bottom: 0.5%;
}
.table {
  --bs-table-accent-bg: white !important;
}
</style>
