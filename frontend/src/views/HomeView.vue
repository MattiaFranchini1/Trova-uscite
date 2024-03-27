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


            <v-container fluid class="d-flex align-center justify-center" style="margin-top: 15%;color:white;">
                <v-flex xs12 md8>
                    <!-- Utilizza 12 colonne su dispositivi extra small e 8 colonne su dispositivi di dimensioni medie -->
                    <div class="d-flex flex-column align-center">
                        <v-img :src="profileAvatarTrimmed" alt="Avatar" class="rounded-circle mb-5"
                            style="width: 100%; height: 100%;"></v-img>
                        <h4 class="text-center">Ora attuale in Italia: {{ currentItalianTime }}</h4>
                        <h1 class="text-center">{{ userProfile.name }}</h1>
                        <v-chip :href="'mailto:' + userProfile.email" class="ma-2 text-center" color="cyan" label>
                            <v-icon icon="mdi-email" start></v-icon>
                            {{ userProfile.email }}
                        </v-chip>
                        <h4 class="text-center">CLASSE: {{ this.classInfo }}</h4>
                        <h4 class="text-center">AULA: {{ aula }}</h4>
                        <h4 class="text-center">PUNTO DI RACCOLTA: </h4>
                    </div>
                </v-flex>
            </v-container>
        </v-app>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            profileDataLoaded: false,
            menuOpen: false,
            currentItalianTime: '',
            class: '',
            aula: '',
            classInfo: '',
        };
    },
    // Altri metodi del componente...
    computed: {
        userProfileAvatar() {
            return this.$store.state.userProfile ? this.$store.state.userProfile.userInfo.picture : '';
        },
        userProfile() {
            return this.$store.state.userProfile ? this.$store.state.userProfile.userInfo : {};
        },
        profileAvatarTrimmed() {
            return this.$store.state.userProfile ? this.$store.state.userProfile.userInfo.picture.slice(0, -6) : '';
        }
    },
    mounted() {
        this.fetchProfileData();
        setInterval(this.updateItalianTime, 1000);
    },
    methods: {
        async fetchProfileData() {
            try {
                const response = await axios.get('http://localhost:3000/userInfo', { withCredentials: true });
                this.$store.commit('setProfile', response.data);
                console.log(this.$store.state.userProfile.userInfo.email)
                await this.fetchClasse();
                await this.fetchClassInfo();
                this.profileDataLoaded = true;
            } catch (error) {
                this.$router.replace('/login');
                console.error('Errore nella richiesta Axios:', error);
            }
        },
        async fetchClasse() {
            try {
                const token = '<TOKEN>';
                const email = this.$store.state.userProfile.userInfo.email;
                const response = await axios.get(`https://sipal.itispaleocapa.it/api/proxySipal/studenti/${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.class = response.data.Classe
                console.log(response.data.Classe)
                this.$store.commit('setProfile', {
                    ...this.$store.state.userProfile,
                    classe: response.data.Classe
                });
            } catch (error) {
                console.error('Errore durante il recupero della classe:', error);
            }
        },
        async fetchClassInfo() {
            try {
                const token = '<TOKEN>';
                const classe = this.class;
                const response = await axios.get(`https://sipal.itispaleocapa.it/api/proxySipal/studenti/classe/${classe}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                //console.log(response)
                this.classInfo = `${this.class} - ${response.data.studenti} alunni`;
                //console.log(this.classInfo)
            } catch (error) {
                console.error('Errore durante il recupero delle informazioni sulla classe:', error);
            }
        },
        async fetchAula() {
            try {
                const token = '<TOKEN>';
                const email = this.$store.state.userProfile.userInfo.email;
                const currentHour = new Date().getHours();
                const currentDay = new Date().getDay();
                const response = await axios.get(`https://sipal.itispaleocapa.it/api/proxySipal/studenti/classe/${currentDay}/${currentHour}/${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.aula = response.data.Aula;
            } catch (error) {
                console.error('Errore durante il recupero dell\'aula:', error);
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
        updateItalianTime() {
            const currentHour = new Date().getHours();
            let label = '';

            if (currentHour >= 8 && currentHour <= 13) {
                const hourIndex = Math.floor((currentHour - 8) / 1) + 1;
                label = `(${this.convertToOrdinal(hourIndex)} ORA)`;
            } else {
                label = 'Orario fuori scuola';
            }

            const date = new Date().toLocaleString('en-US', {
                timeZone: 'Europe/Rome', // Imposta il fuso orario su Roma
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            });
            this.currentItalianTime = `${date} (${label})`;
        },
        convertToOrdinal(number) {
            const suffixes = ["PRIMA", "SECONDA", "TERZA", "QUARTA", "QUINTA", "SESTA"];
            return suffixes[number - 1] || '';
        },
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