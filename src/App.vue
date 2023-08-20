<template>
  <v-app>
    <HeaderMenu />
    <v-main class="mt-10">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// Components
import HeaderMenu from "./components/HeaderMenu.vue";

export default {
  name: "App",
  components: {
    HeaderMenu,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
