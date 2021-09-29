<template>
  <div class="row">
    <div>
      <HeaderSolicitante />
    </div>
    <h1>ESTA VISTA ES EL HOME</h1>
    <Footer class="fixed-bottom" />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue';
import HeaderSolicitante from '../components/HeaderSolicitante.vue';
export default {
  name: 'Home',
  components: {
    Footer,
    HeaderSolicitante,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
