<template>
  <div class="container">
    <h1 class="title">Aule Details</h1>
    <div v-if="filteredAule.length === 0">Nessuna aula trovata</div>
    <template v-else>
      <v-row v-for="(section, floor) in groupedAule" :key="floor" class="floor-row">
        <v-col cols="12" class="floor-col">
          <h2 style="color: white;">{{ floor.toUpperCase() }}</h2>
        </v-col>
        <v-col cols="12" style="background-color: #424242;">
          <v-carousel >
            <v-carousel-item v-for="(group, index) in chunkArray(section, 4)" :key="index">
              <v-row>
                <v-col v-for="(aula, aulaIndex) in group" :key="aulaIndex" cols="12" md="3">
                  <v-card :style="{ backgroundColor: getColor(aula.PuntoRaccolta) }">
                    <v-card-title style="font-weight: bold;">
                      {{ aula.Longname }}
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="1">
                          <v-icon color="white">mdi-school</v-icon>
                        </v-col>
                        <v-col cols="11">
                          <p>Edificio: {{ aula.Edificio }}</p>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="1">
                          <v-icon color="white">mdi-elevator</v-icon>
                        </v-col>
                        <v-col cols="11">
                          <p>Piano: {{ aula.Piano }}</p>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="1">
                          <v-icon color="white">mdi-map-marker</v-icon>
                        </v-col>
                        <v-col cols="11">
                          <p>Punto Raccolta: {{ aula.PuntoRaccolta }}</p>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import aule from '../../aule_init.js';

export default {
  data() {
    return {
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
      return grouped;
    }
  },
  methods: {
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
