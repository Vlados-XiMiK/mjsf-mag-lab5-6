const getters = {
  id: state=>state.user.data.uid,
  email: state=>state.user.data.email,
  name:  state=>state.user.data.displayName,
  verified: state=>state.user.data.emailVerified,
  loggedIn: state=>state.user.loggedIn,
};
export default getters;
