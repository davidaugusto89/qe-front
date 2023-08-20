<template>
  <v-btn :size="size" :elevation="elevation" :color="color">
    <v-icon :icon="icon" v-if="icon" class="mr-1"></v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "ButtonIcon",
  props: {
    text: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "secondary",
    },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
    },
    elevation: {
      type: String,
      default: "16",
    },
  },
  data: () => ({}),
};
</script>
