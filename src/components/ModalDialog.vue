<template>
  <v-dialog v-model="show" persistent :width="width">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <slot name="content" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green-darken-1"
          variant="text"
          @click="toogleModal"
          :width="'700'"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalDialog",
  props: {
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "auto",
    },
  },
  computed: {},
  methods: {
    toogleModal() {
      let show = this.show;
      this.show = !show;
    },
  },
  data: () => ({
    show: false,
  }),
};
</script>
