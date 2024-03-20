<template>
    <div>
        <v-app style="background-color: #121212;">
            <v-app-bar app style="background-color: #333; color: white;">
                <v-toolbar-title>TROVA USCITE</v-toolbar-title>
                <router-link to="/aule" class="mr-5" style="text-decoration: none;color:white;">
                    AULE
                </router-link>
                <v-spacer></v-spacer>

                <v-avatar size="36" class="mr-5" v-if="profileDataLoaded" @click="openProfile">
                    <v-btn icon>
                        <v-img :src="userProfileAvatar" alt="Avatar" style="width: 36px; height: 36px;"></v-img>
                    </v-btn>
                </v-avatar>

                <!-- <v-menu v-model="menuOpen" offset-y transition="scale-transition">
                    <v-list>
                        <v-list-item @click="logout">
                            <v-list-item-content class="text-center">
                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu> -->
            </v-app-bar>

            <v-container class="d-flex align-center justify-center" style="margin-top: 5%; height: 20%; width: 60%;">
                <v-card class="mx-auto custom-width" outlined
                    style="width: 100%; height: 100%; background-color: orange; position: relative;">
                    <v-card-text class="text-center align-center">
                        PALAZZINA CENTRALE
                    </v-card-text>
                    <v-btn @click="redirectToAula('edificio centrale')" style="position: absolute; right: 10px; bottom: 10px;">
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
                    <v-btn @click="redirectToAula('Elettronica')" style="position: absolute; right: 10px; bottom: 10px;">
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
                    <v-btn @click="redirectToAula('Informatica')" style="position: absolute; right: 10px; bottom: 10px;">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </v-card>
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
        };
    },
    computed: {
        userProfileAvatar() {
            return this.$store.state.userProfile.userInfo.picture;
        },
        userProfile() {
            //console.log(this.$store.state.userProfile.userInfo)
            return this.$store.state.userProfile.userInfo;
        },
        profileAvatarTrimmed() {
            return this.$store.state.userProfile.userInfo.picture.slice(0, -6);
        }
    },
    mounted() {
        this.fetchProfileData();
    },
    methods: {
        redirectToAula(param) {
            console.log("-----------")
            this.$router.push(`/aule-details/${param}`);
        },
        async fetchProfileData() {
            try {
                const response = await axios.get('http://localhost:3000/userInfo', { withCredentials: true });
                this.$store.commit('setProfile', response.data);
                this.profileDataLoaded = true;
            } catch (error) {
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
        openProfile() {
            console.log("Profile opened!");
            this.menuOpen = !this.menuOpen;
        },
    },
};
</script>



