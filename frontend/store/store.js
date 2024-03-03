import { createStore } from 'vuex';

const store = createStore({
  state: {
    userProfile: null,
  },
  mutations: {
    setProfile(state, profile) {
      state.userProfile = profile;
    },
      clearUserProfile(state) {
        state.userProfile.userInfo = null;
      },
  },
});

export default store;
