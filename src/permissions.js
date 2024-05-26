import {router} from './router/index';
import firebase from "./_firebase-init";
router.afterEach((to)=>{
  document.title = to.meta.title;
});
router.beforeEach((to, from, next) => {
  console.log(to.meta.title,to, from, next);
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if (firebase.auth().currentUser && to.name === 'login'){
    return next({name: 'home'});
  }
  if (requiresAuth && !firebase.auth().currentUser) {
    next('/login')
  } else {
    next()
  }
});
