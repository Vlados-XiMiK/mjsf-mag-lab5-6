import Vue from 'vue'
import ToDoPlugin from './plugins/todoPlugin';
import VueRouter from 'vue-router';
import App from './App.vue'
import services from './services';
import firebase from "./_firebase-init";
import './permissions';
import store from './store';
import {router} from "./router";
import vuetify from './plugins/vuetify';

// Подключение Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.prototype.$services = services;
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ToDoPlugin);
firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    router,
    store,
    render: h => h(App),
    vuetify,
  }).$mount('#app')
  if (user) {
    store.commit('user/LOGIN', user)
  }
});
