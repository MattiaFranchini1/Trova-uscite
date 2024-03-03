<template>
    <v-container class="google-login-card" fluid>
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="elevated-card">
            <v-row align="center">
              <v-icon class="icon-size primary--text">mdi-google</v-icon>
              
              <v-col>
                <v-card-title class="text-h4 mb-4">Accedi con Google</v-card-title>
                <v-card-text>
                  Benvenuto! Accedi con il tuo account Google per iniziare.
                </v-card-text>
              </v-col>
            </v-row>
            
            <v-card-actions>
              <v-btn @click="loginWithGoogle" color="primary" dark>Accedi con Google</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    methods: {
      loginWithGoogle() {
        window.location.href = "http://localhost:3000/google";
      }
    }
  };
  </script>
  
  <style scoped>
  .google-login-card {
    height: 100vh;
  }
  
  .fill-height {
    height: 100%;
  }
  
  .elevated-card {
    background-color: #333;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto; 
  }
  
  .icon-size {
    font-size: 48px;
  }
  
  .primary--text {
    color: #03a9f4; 
  }
  
  .text-h4, .v-card-text, .v-btn {
    color: #ffffff;
  }
  </style>
  