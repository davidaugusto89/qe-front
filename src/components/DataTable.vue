<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="itemsPerPage"
    class="elevation-5"
  >
    <template #[`item.actions`]="{ item }">
      <button-icon
        :text="'Editar'"
        :color="'success'"
        :icon="'mdi-pencil'"
        :size="'x-small'"
        class="me-2"
        @click="editItem(item)"
      />
      <button-icon
        :text="'Detalhes'"
        :color="'info'"
        :icon="'mdi-eye-outline'"
        :size="'x-small'"
        class="me-2"
        @click="infoItem(item)"
      />
      <button-icon
        :color="'red-darken-4'"
        :text="'Remover'"
        :icon="'mdi-delete'"
        :size="'x-small'"
        class="me-2"
        @click="deleteItem(item)"
      />
    </template>
  </v-data-table>
</template>

<script>
import ButtonIcon from "./ButtonIcon.vue";
export default {
  components: { ButtonIcon },
  name: "DataTable",
  emits: ["editItem", "deleteItem", "infoItem"],
  props: {
    headers: {
      type: Object,
    },
    data: {
      type: Object,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
  },
  data: () => ({}),
  methods: {
    editItem(item) {
      this.$emit("editItem", item.value);
    },
    infoItem(item) {
      this.$emit("infoItem", item.value);
    },
    deleteItem(item) {
      this.$emit("deleteItem", item.value);
    },
  },
};
</script>
