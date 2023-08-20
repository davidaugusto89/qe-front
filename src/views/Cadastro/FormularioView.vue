<template>
  <v-container>
    <v-row>
      <v-col cols="9" align-self="start">
        <h2>{{ title }}</h2>
      </v-col>
      <v-col cols="3" align-self="end" align="right">
        <btn-icon
          :text="'Voltar'"
          :color="'info'"
          to="/cadastros"
          :icon="'mdi-arrow-left'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <FormComponent
          :form="form"
          :payload="payload"
          :button-label="label_button"
          @send-form="sendForm"
          ref="formComponent"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import APIDataService from "@/service/APIDataService";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "FormularioView",
  data() {
    return {
      id: null,
      payload: {
        codigo: "",
        nome: "",
        cpf_cnpj: "",
        cep: "",
        logradouro: "Rua",
        endereco: "",
        numero: "",
        complemento: "",
        uf: "",
        cidade: "",
        fone: "",
        limite_credito: "",
        validade: "",
      },
    };
  },
  setup() {
    const store = useStore();
    const form = computed(() => store.state.formCadastro);
    return {
      form,
    };
  },
  computed: {
    title() {
      return typeof this.id === "undefined"
        ? "Adicionar Cadastro"
        : `Editar Cadastro #${this.id}`;
    },
    label_button() {
      return typeof this.id === "undefined"
        ? "Salvar Cadastro"
        : "Atualizar Cadastro";
    },
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id !== "undefined" ? route.params.id : 0;
    if (this.id) {
      this.loadCadastro(this.id);
    }
  },

  methods: {
    async sendForm(formData) {
      if (typeof this.id === "undefined") {
        await this.createCadastro(formData);
      } else {
        await this.updateCadastro(formData);
      }
    },

    async createCadastro(formData) {
      try {
        await APIDataService.create(formData).then(async (response) => {
          await this.$swal({
            icon: "success",
            title: "Sucesso!",
            text: response.data.message,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
          });
          this.$router.push("/cadastros");
        });
      } catch (error) {
        console.log(error);
        await this.$swal({
          icon: "warning",
          title: "Alerta!",
          text: error.message,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        console.error(error.message);
      }
    },

    async updateCadastro(formData) {
      try {
        await APIDataService.update(this.id, formData).then(
          async (response) => {
            await this.$swal({
              icon: "success",
              title: "Sucesso!",
              text: response.data.message,
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
              allowOutsideClick: false,
            });
            this.$router.push("/cadastros");
          }
        );
      } catch (error) {
        console.log(error);
        await this.$swal({
          icon: "warning",
          title: "Alerta!",
          text: error.message,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        console.error(error.message);
      }
    },

    async loadCadastro(id) {
      try {
        await APIDataService.getID(id).then(async (response) => {
          let data = response.data;

          data["validade"] = this.$formatDateBR(data["validade"]);
          data["limite_credito"] = this.$formatMoney(data["limite_credito"]);

          this.$refs.formComponent.loadData(data);
        });
      } catch (error) {
        await this.$swal({
          icon: "warning",
          title: "Alerta!",
          text: "Cadastro não localizado!",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        this.$router.push("/cadastros");
        console.error(error.message);
      }
    },
  },
});
</script>
