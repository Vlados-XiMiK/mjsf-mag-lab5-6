<template>
  <div>
    <v-btn @click="$router.push({ name: 'home' })" text>
      <span class="mr-2">ToDoApp</span>
    </v-btn>
    <v-btn @click="$router.push({ name: 'about' })" text>
      <span class="mr-2">About</span>
    </v-btn>
  </div>
</template>
<script>
  export default {
    name: 'main-menu'
  }
</script>
