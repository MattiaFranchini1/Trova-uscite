<template>
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

        <!-- Grafica per desktop -->
        <v-container v-if="!isMobile">
            <v-container class="d-flex align-center justify-center" style="margin-top: 5%; height: 20%; width: 60%;">
                <v-card class="mx-auto custom-width" outlined
                    style="width: 100%; height: 100%; background-color: orange; position: relative;">
                    <v-card-text class="text-center align-center">
                        PALAZZINA CENTRALE
                    </v-card-text>
                    <v-btn @click="redirectToAula('edificio centrale')"
                        style="position: absolute; right: 10px; bottom: 10px;">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </v-card>
            </v-container>

            <v-container class="d-flex" style="margin-top: 20px; width: 60%;">
                <v-card class="mx-3" outlined
                    style="width: 300px; height: 300px; background-color: red; position: relative; display: flex; justify-content: center; align-items: center;">
                    <v-card-text class="text-center" style="font-weight: bold;">
                        PALAZZINA ELETTRONICA
                    </v-card-text>
                    <v-btn @click="redirectToAula('Elettronica')"
                        style="position: absolute; right: 10px; bottom: 10px;">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </v-card>
                <v-spacer></v-spacer>
                <v-card class="mx-3" outlined
                    style="width: 300px; height: 300px; background-color: purple; position: relative; display: flex; justify-content: center; align-items: center;">
                    <v-card-text class="text-center" style="font-weight: bold;">
                        PALAZZINA TESSILE
                    </v-card-text>
                    <v-btn @click="redirectToAula('Tessile')" style="position: absolute; right: 10px; bottom: 10px;">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </v-card>
            </v-container>



            <v-container class="d-flex" style="margin-top: 20px; width: 60%;">
                <v-card class="mx-3" outlined
                    style="width: 300px; height: 300px; background-color: yellow; position: relative; display: flex; justify-content: center; align-items: center;">
                    <v-card-text class="text-center" style="font-weight: bold;">
                        PALAZZINA MECCANICA
                    </v-card-text>
                    <v-btn @click="redirectToAula('Meccanica')" style="position: absolute; right: 10px; bottom: 10px;">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </v-card>
                <v-spacer></v-spacer>
                <v-card class="mx-3" outlined
                    style="width: 300px; height: 300px; background-color: green; position: relative; display: flex; justify-content: center; align-items: center;">
                    <v-card-text class="text-center" style="font-weight: bold;">
                        PALAZZINA INFORMATICA
                    </v-card-text>
                    <v-btn @click="redirectToAula('Informatica')"
                        style="position: absolute; right: 10px; bottom: 10px;">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </v-card>
            </v-container>
        </v-container>

        <!-- Grafica per telefono -->
        <v-container v-else style="margin-top: 13%;">
            <v-row justify="center">
                <v-col cols="12" v-for="(item, index) in buildings" :key="index">
                    <v-card outlined class="mx-3 my-3" :style="{ 'background-color': item.color }">
                        <v-card-text class="text-center" style="font-weight: bold;">
                            {{ item.name }}
                        </v-card-text>
                        <v-btn @click="redirectToAula(item.redirect)" class="ma-2" color="white">
                            <v-icon>mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            profileDataLoaded: false,
            buildings: [
                { name: 'PALAZZINA CENTRALE', color: 'orange', redirect: 'edificio centrale' },
                { name: 'PALAZZINA ELETTRONICA', color: 'red', redirect: 'Elettronica' },
                { name: 'PALAZZINA TESSILE', color: 'purple', redirect: 'Tessile' },
                { name: 'PALAZZINA MECCANICA', color: 'yellow', redirect: 'Meccanica' },
                { name: 'PALAZZINA INFORMATICA', color: 'green', redirect: 'Informatica' }
            ],
            isMobile: false
        };
    },
    computed: {
        userProfileAvatar() {
            return this.$store.state.userProfile.userInfo.picture;
        },
        userProfile() {
            return this.$store.state.userProfile.userInfo;
        }
    },
    mounted() {
        this.fetchProfileData();
        this.checkIfMobile();
        window.addEventListener('resize', this.checkIfMobile);
    },
    methods: {
        redirectToAula(param) {
            this.$router.push(`/aule-details/${param}`);
        },
        async fetchProfileData() {
            try {
                const response = await axios.get('http://localhost:3000/userInfo', { withCredentials: true });
                this.$store.commit('setProfile', response.data);
                this.profileDataLoaded = true;
            } catch (error) {
                this.$router.replace('/login');
                console.error('Errore nella richiesta Axios:', error);
            }
        },
        async logout() {
            try {
                this.$router.replace('/login');
                this.$store.commit('clearUserProfile');
                await axios.get('http://localhost:3000/logout', { withCredentials: true });
            } catch (error) {
                console.error('Errore durante il logout:', error);
            }
        },
        openProfile() {
            this.menuOpen = !this.menuOpen;
        },
        checkIfMobile() {
            this.isMobile = window.innerWidth <= 768;
        },
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkIfMobile);
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