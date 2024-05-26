import firebase from "../../_firebase-init";

const state = {
  data: null,
  loggedIn: false
};

const mutations = {
  LOGIN(state, payload) {
    state.data = payload;
    state.loggedIn = true
  },
  LOG_OUT(state) {
    state.data = null;
    state.loggedIn = false
  }
};

const actions = {
  login({commit}, user) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(response => {
          commit("LOGIN", response.user);
          resolve(response.user)
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout({commit}) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          commit("LOG_OUT");
          resolve(true)
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
