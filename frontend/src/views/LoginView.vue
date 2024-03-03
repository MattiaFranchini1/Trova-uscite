<template>
    <v-container class="fill-height">
      <v-row align="center" justify="center" class="fill-height">
        <v-col cols="12" sm="8" md="6" class="d-flex align-center justify-center">
          <GoogleLoginCard />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import GoogleLoginCard from '../components/GoogleLoginCard.vue';
  
  export default {
    components: {
      GoogleLoginCard
    }
  };
  </script>
  
  <style scoped>
  /* Stili specifici per questa vista */
  .fill-height {
    height: 100vh;
  }
  </style>
  