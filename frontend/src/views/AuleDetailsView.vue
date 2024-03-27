<template>
  <div class="container">
    <v-app style="background-color: #121212;">
      <v-app-bar app style="background-color: #333; color: white;">
        <v-toolbar-title class="mr-5 toolbar-title"></v-toolbar-title>

        <!-- Link per la homepage -->
        <a href="/" class="mr-5 nav-link" style="text-decoration: none;color: white;">
          HOME
        </a>

        <!-- Link per le aule -->
        <a href="/aule" class="mr-5 nav-link" style="text-decoration: none;color: white;">
          AULE
        </a>

        <!-- Link per i punti di raccolta -->
        <a href="/punti-raccolta" class="mr-5 nav-link" style="text-decoration: none;color: white;">
          PUNTI DI RACCOLTA
        </a>

        <!-- Spacer per spingere gli elementi a destra -->
        <v-spacer></v-spacer>

        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar v-if="profileDataLoaded">
                <v-img :src="userProfileAvatar" alt="Avatar" style="width: 36px; height: 36px;"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-btn href="/" variant="text" rounded>
                  profile
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn variant="text" rounded @click="logout">
                  Logout
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-app-bar>


      <h1 class="title">Dettagli Aule</h1>
      <div v-if="filteredAule.length === 0">Nessuna aula trovata</div>
      <template v-else>
        <v-row v-for="(section, floor) in groupedAule" :key="floor" class="floor-row">
          <v-col cols="12" class="floor-col">
            <h2 style="color: white;">{{ floor.toUpperCase() }}</h2>
          </v-col>
          <v-col cols="12">
            <v-card class="mx-auto" style="width: 90%; background-color: #121212;">
              <v-data-iterator :items="section" :items-per-page="3" :search="search">
                <template v-slot:default="{ items }">
                  <v-container class="pa-2" fluid>
                    <v-row dense>
                      <v-col v-for="item in items" :key="item.raw.Longname" cols="auto" md="4">
                        <v-card :style="{ backgroundColor: getColor(item.raw.PuntoRaccolta) }" class="pb-3" border flat>

                          <v-card-title style="font-weight: bold;">
                            {{ item.raw.Longname }}
                          </v-card-title>
                          <v-card-text>
                            <v-row>
                              <v-col cols="1">
                                <v-icon color="white">mdi-school</v-icon>
                              </v-col>
                              <v-col cols="11">
                                <p>Edificio: {{ item.raw.Edificio }}</p>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="1">
                                <v-icon color="white">mdi-elevator</v-icon>
                              </v-col>
                              <v-col cols="11">
                                <p>Piano: {{ item.raw.Piano }}</p>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="1">
                                <v-icon color="white">mdi-map-marker</v-icon>
                              </v-col>
                              <v-col cols="11">
                                <p>Punto Raccolta: {{ item.raw.PuntoRaccolta }}</p>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
                <template v-slot:footer="{ page, pageCount, prevPage, nextPage }"
                  style="color: white;background-color: white;">
                  <div class="d-flex align-center justify-center pa-4">
                    <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded
                      @click="prevPage" style="color: white"></v-btn>
                    <div class="mx-2 text-caption" style="color: white">Pagina {{ page }} di {{ pageCount }}</div>
                    <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal"
                      rounded @click="nextPage" style="color: white"></v-btn>
                  </div>
                </template>
              </v-data-iterator>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-app>
  </div>
</template>


<script>
import aule from '../../aule_init.js';
import axios from 'axios';

export default {
  data() {
    return {
      profileDataLoaded: false,
      params: null,
      aule: aule,
      colors: {
        "Rosso": "#FF0000",
        "Fucsia": "#FF00FF",
        "Azzurro": "#00FFFF",
        "Viola": "#8F00FF",
        "Verde": "#008000",
        "Giallo": "#FFFF00",
      }
    }
  },
  computed: {
    userProfileAvatar() {
      return this.$store.state.userProfile.userInfo.picture;
    },
    userProfile() {
      return this.$store.state.userProfile.userInfo;
    },
    profileAvatarTrimmed() {
      return this.$store.state.userProfile.userInfo.picture.slice(0, -6);
    },
    filteredAule() {
      if (!this.params) return [];
      return this.aule.filter(aula => aula.Edificio === this.params.identificatore);
    },
    groupedAule() {
      const grouped = {};
      this.filteredAule.forEach(aula => {
        if (!grouped[aula.Piano]) {
          grouped[aula.Piano] = [];
        }
        grouped[aula.Piano].push(aula);
      });
      console.log(grouped)
      return grouped;
    }
  },
  mounted() {
    this.fetchProfileData();
  },

  methods: {
    async fetchProfileData() {
      try {
        const response = await axios.get('http://localhost:3000/userInfo', { withCredentials: true });
        this.$store.commit('setProfile', response.data);
        //await this.fetchClasse();
        //await this.fetchClassInfo();
        this.profileDataLoaded = true;
      } catch (error) {
        this.$router.replace('/login');
        console.error('Errore nella richiesta Axios:', error);
      }
    },
    async logout() {
      try {
        console.log("Sloggato!!!")
        this.$router.replace('/login');
        this.$store.commit('clearUserProfile');
        await axios.get('http://localhost:3000/logout', { withCredentials: true });
      } catch (error) {
        console.error('Errore durante il logout:', error);
      }
    },
    getColor(puntoRaccolta) {
      const color = puntoRaccolta.split(' ')[1];
      return this.colors[color] || 'white';
    },
    chunkArray(array, chunkSize) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunkedArray.push(array.slice(i, i + chunkSize));
      }
      return chunkedArray;
    }
  },
  created() {
    this.params = this.$route.params
  }
}
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}

.title {
  text-align: center;
  color: white;
}

.floor-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.floor-row {
  margin-bottom: 40px;
  margin-top: 20px;
}
</style>
