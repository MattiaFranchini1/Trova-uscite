<template>
    <div>
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


            <div v-if="isMobile">
                <h1 style="color: white;margin-top: 20%;text-align: center;">PUNTI DI RACCOLTA</h1>
                <v-container fluid style="margin-top: 10%; width: 80%;" justify="center" align="center">
                    <v-row justify="center" align="center" class="mb-8">
                        <v-col cols="4" v-for="(button, index) in buttons" :key="index">
                            <v-btn :color="button.color" fab class="ma-2 rounded-circle"
                                style="width: 56px; height: 56px;" @click="handleButtonClick(button.label)"
                                :title="'PUNTO DI RACCOLTA ' + button.label.toUpperCase()">
                                <v-icon>mdi-parking</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </div>

            <div v-else>
                <h1 style="color: white; margin-top: 4%;text-align: center;">PUNTI DI RACCOLTA</h1>
                <v-container fluid style="margin-top: 7%; width: 80%;" justify="center" align="center">
                    <v-row justify="center" align="center" class="mb-8">
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(button, index) in buttons" :key="index">
                            <v-btn :color="button.color" fab class="ma-2 rounded-circle"
                                style="width: 56px; height: 56px;" @click="handleButtonClick(button.label)"
                                :title="'PUNTO DI RACCOLTA ' + button.label.toUpperCase()">
                                <v-icon>mdi-parking</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </div>



            <v-card class="mx-auto" style="width: 90%;" v-if="visible_card">
                <v-data-iterator :items="filteredAule" :items-per-page="3" :search="search">
                    <template v-slot:default="{ items }">
                        <v-container class="pa-2" fluid>
                            <h1 style="text-align: center;">{{ this.studenti_totali }} STUDENTI TOTALI</h1>
                            <v-row dense>
                                <v-col v-for="item in items" :key="item.raw.Longname" cols="auto" md="4">
                                    <v-card :style="{ backgroundColor: getColor(item.raw.PuntoRaccolta) }" class="pb-3"
                                        border flat @click="handleCardClick(item.raw)">

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
                    <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                        <div class="d-flex align-center justify-center pa-4">
                            <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal"
                                rounded @click="prevPage"></v-btn>
                            <div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>
                            <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right"
                                variant="tonal" rounded @click="nextPage"></v-btn>
                        </div>
                    </template>
                </v-data-iterator>
            </v-card>
        </v-app>

        <v-dialog v-model="dialogVisible" max-width="500px">
            <v-card>
                <v-card-title>
                    <strong>{{ selectedAula.Longname }}</strong>
                </v-card-title>
                <v-card-text>
                    <div v-if="selectedAula" style="text-align: center;">
                        <p>CLASSE PRESENTE NELLA AULA: <strong>{{ this.classe }} ({{ this.studenti }} studenti)</strong>
                        </p>
                        <p>Edificio: {{ selectedAula.Edificio }}</p>
                        <p>Piano: {{ selectedAula.Piano }}</p>
                        <img :src="getAulaImagePath(selectedAula)" alt="Aula Image" style="max-width: 100%;">
                        <!-- Aggiungiamo un divisore -->
                        <v-divider class="my-4"></v-divider>
                        <p style="font-weight: bold;">Punto Raccolta: {{ selectedAula.PuntoRaccolta }}</p><br>
                        <img :src="getAulapointImagePath(selectedAula)" alt="Aula Image" style="max-width: 100%;">
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="closeDialog">Chiudi</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>


<script>
import axios from 'axios';
import auleInit from '../../aule_init.js';

export default {
    data() {
        return {
            buttons: [
                { label: 'Rosso', color: 'red' },
                { label: 'Fucsia', color: '#ff00ff' },
                { label: 'Giallo', color: 'yellow' },
                { label: 'Verde', color: 'green' },
                { label: 'Viola', color: 'purple' },
                { label: 'Azzurro', color: '#007fff' }
            ],
            profileDataLoaded: false,
            menuOpen: false,
            filteredAule: [],
            isMobile: false,
            dialogVisible: false,
            selectedAula: null,
            visible_card: false,
            classe: '',
            studenti: 0,
            studenti_totali: 0,
        };
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
        }
    },
    mounted() {
        this.checkIfMobile();
        this.fetchProfileData();
    },
    methods: {
        async fetchProfileData() {
            try {
                const response = await axios.get('http://localhost:3000/userInfo', { withCredentials: true });
                this.$store.commit('setProfile', response.data);

                if (this.$store.state.userProfile.userInfo.email !== 'rspp@itispaleocapa.it' && this.$store.state.userProfile.userInfo.email !== 'gabriele.arcuri@itispaleocapa.it') {
                    this.$router.replace('/');
                }
                //await this.fetchClasse();
                //await this.fetchClassInfo();
                this.profileDataLoaded = true;
            } catch (error) {
                this.$router.replace('/login');
                console.error('Errore nella richiesta Axios:', error);
            }
        },
        getColor(puntoRaccolta) {
            console.log(puntoRaccolta.split(' ')[1])
            switch (puntoRaccolta.split(' ')[1]) {
                case 'Rosso':
                    return 'red';
                case 'Fucsia':
                    return '#ff00ff';
                case 'Giallo':
                    return 'yellow';
                case 'Verde':
                    return 'green';
                case 'Viola':
                    return 'purple';
                case 'Azzurro':
                    return '#007fff';
                default:
                    return 'white';
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
        openProfile() {
            console.log("Profile opened!");
            this.menuOpen = !this.menuOpen;
        },
        handleButtonClick(color) {
            this.visible_card = true;
            this.filteredAule = auleInit.filter(aula => aula.PuntoRaccolta.split(' ')[1] == color);
            console.log(this.filteredAule);
            this.studenti_totali = 0;
            for (let i = 0; i < this.filteredAule.length; i++) {
                const currentHour = new Date().getHours();
                //console.log(currentHour - 7)
                const currentDay = new Date().getDay();
                

                axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
                    .then(response => {
                        console.log(response.data);
                        const classe_tot = response.data.classe;
                        axios.get(`https://sipal.itispaleocapa.it/api/proxySipal/v1/studenti/classe/${classe_tot}`, { headers: { Authorization: `Bearer ${token}` } })
                            .then(response => {
                                console.log(response.data);
                                this.studenti_totali = response.data.studenti + this.studenti_totali;
                            })
                            .catch(error => {
                                console.error('Errore nella chiamata API:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Errore nella chiamata API:', error);
                    });
            }

        },
        checkIfMobile() {
            this.isMobile = window.innerWidth <= 768;
        },
        openDialog(aula, classe) {
            this.selectedAula = aula;
            console.log(this.selectedAula);
            console.log(this.classe);
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        handleCardClick(aula) {
            const currentHour = new Date().getHours();
            //console.log(currentHour - 7)
            const currentDay = new Date().getDay();
            
            const url = `https://sipal.itispaleocapa.it/api/proxySipal/v1/studenti/classe/${currentDay}/${(currentHour - 7)}/${aula.Name}`;

            axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    console.log(response.data);
                    this.classe = response.data.classe;
                    axios.get(`https://sipal.itispaleocapa.it/api/proxySipal/v1/studenti/classe/${this.classe}`, { headers: { Authorization: `Bearer ${token}` } })
                        .then(response => {
                            console.log(response.data);
                            this.studenti = response.data.studenti ? response.data.studenti : 0;
                            this.openDialog(aula, response.data);
                        })
                        .catch(error => {
                            console.error('Errore nella chiamata API:', error);
                        });
                })
                .catch(error => {
                    console.error('Errore nella chiamata API:', error);
                    this.classe = "Nessuna classe in questa aula";
                    this.studenti = 0;
                    this.openDialog(aula, "Nessuna classe in questa aula");
                });
        },
        getAulapointImagePath(aula) {
            console.log()
            return `/images/${aula.PuntoRaccolta.split(' ')[1].toLowerCase()}.png`;
        },
        getAulaImagePath(aula) {
            let edificio = "";
            if (aula.Edificio == "edificio centrale") {
                edificio = "centrale";
            } else if (aula.Edificio == "Palestra") {
                edificio = "palestre";
            } else {
                edificio = aula.Edificio.toLowerCase();
            }

            const pianoDict = {
                "piano terra": 1,
                "primo piano": 2,
                "secondo piano": 3,
                "terzo piano": 4
            };

            const colore = aula.PuntoRaccolta.split(' ')[1].toLowerCase();

            if (edificio == "palestre") {
                return `/images/${edificio}_${colore}.png`;
            } else {
                return `/images/${edificio}_${pianoDict[aula.Piano]}_${colore}.png`;
            }
            //console.log(pianoDict[aula.Piano]);

        }
    },
};
</script>

<style>
.nav-link {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media screen and (max-width: 600px) {
    .toolbar-title {
        font-size: 0.6rem;
    }
}

@media screen and (max-width: 600px) {
    .nav-link {
        font-size: 0.8rem;
    }
}
</style>
