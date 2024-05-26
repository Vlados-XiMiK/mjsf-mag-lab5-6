<template>
  <v-app>
    <v-app-bar
        app
        absolute
        color="primary"
        dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>ToDoApp</v-toolbar-title>
      <v-spacer></v-spacer>
      <main-menu/>
      <profile-menu/>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-content>
          <router-view></router-view>
        </v-content>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import ProfileMenu from "./components/ProfileMenu";
  import MainMenu from "./components/MainMenu";

  export default {
    name: "Layout",
    components: {MainMenu, ProfileMenu}
  }
</script>

