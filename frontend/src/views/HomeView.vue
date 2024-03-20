<template>
    <div>
        <v-app style="background-color: #121212;">
            <v-app-bar app style="background-color: #333; color: white;">
                <v-toolbar-title>TROVA USCITE</v-toolbar-title>
                <a href="/aule" class="mr-5" style="text-decoration: none;color: white;">
                    AULE
                </a>
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

            <v-container fluid class="d-flex align-center justify-center" style="margin-top: 200px;color:white;">
                <div v-if="profileDataLoaded" class="d-flex align-center" style="max-width: 800px;">
                    <div class="mr-10">
                        <v-img :src="profileAvatarTrimmed" alt="Avatar" class="rounded-circle" style="width: 500px; height: 500px;"></v-img>
                    </div>
                    <div class="ml-10">
                        <h1>{{ userProfile.name }}</h1>
                        <a :href="'mailto:' + userProfile.email">{{ userProfile.email }}</a>
                        <h4>CLASSE: </h4>
                        <h4>AULA: </h4>
                        <h4>PUNTO DI RACCOLTA: </h4>
                    </div>
                </div>
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
  