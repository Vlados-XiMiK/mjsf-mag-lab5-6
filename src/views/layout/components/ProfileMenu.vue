<template>
  <v-btn v-if="loggedIn" text :loading="loading" @click.prevent="logout">
    <span class="mr-2" >Logout ({{email}})</span>
    <v-icon>mdi-logout</v-icon>
  </v-btn>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'profile-menu',
    data(){
      return {
        loading: false
      };
    },
    methods: {
      async logout(){
        this.loading = true;
        await this.$store.dispatch("user/logout")
        this.$router.push({path: '/login', query: {redirect: this.$route.fullPath}});
        this.loading = false;
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'email',
        'loggedIn',
      ])
    }
  }
</script>
