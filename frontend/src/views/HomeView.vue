<template>
    <div>
        <v-app style="background-color: #121212;">
            <v-app-bar app style="background-color: #333; color: white;">
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title>TROVA USCITE</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-avatar size="36" class="mr-5" v-if="profileDataLoaded" @click="openProfile">
                    <v-btn icon>
                        <v-img :src="userProfileAvatar" alt="Avatar" style="width: 36px; height: 36px;"></v-img>
                    </v-btn>
                </v-avatar>

                <v-menu v-model="menuOpen" offset-y transition="scale-transition">
                    <v-list>
                        <v-list-item @click="logout">
                            <v-list-item-content class="text-center">
                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>

            <v-container fluid>
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
  