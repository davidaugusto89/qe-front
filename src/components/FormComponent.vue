<template>
  <v-form @submit.prevent v-model="valid" ref="form">
    <v-container>
      <v-row v-for="(row, index_row) in form.rows" :key="index_row">
        <v-col
          v-for="(field, index_field) in row.fields"
          :key="index_field"
          :cols="field.size"
        >
          <v-text-field
            v-if="field.type == 'text'"
            v-model="data[field.model]"
            v-mask="field.mask"
            :label="field.label"
            :required="field.required || false"
            :maxlength="field.maxlenght"
            :rules="field.rules"
            @change="saveData(field.model, $event)"
          ></v-text-field>

          <v-text-field
            v-else-if="field.type == 'cpf_cnpj'"
            v-model="data[field.model]"
            v-mask="field.mask"
            :label="field.label"
            :required="field.required || false"
            :maxlength="field.maxlenght"
            @change="saveData(field.model, $event)"
          ></v-text-field>

          <v-text-field
            v-else-if="field.type == 'text-no-mask'"
            v-model="data[field.model]"
            :label="field.label"
            :required="field.required || false"
            :maxlength="field.maxlenght"
            :rules="field.rules"
            @change="saveData(field.model, $event)"
          ></v-text-field>

          <v-text-field
            v-else-if="field.type == 'money'"
            v-model="data[field.model]"
            v-money="money"
            :label="field.label"
            :required="field.required || false"
            :maxlength="field.rules"
            :rules="field.rules"
            @change="saveData(field.model, $event)"
          ></v-text-field>

          <v-select
            v-model="data[field.model]"
            v-else-if="field.type == 'select'"
            :label="field.label"
            :required="field.required || false"
            :rules="field.rules"
            :items="field.options"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <button-icon
            :text="`Limpar Formulário`"
            :color="'warning'"
            :icon="'mdi-delete'"
            class="mr-4"
            @click="resetFrom"
          />
          <button-icon
            :text="`${buttonLabel}`"
            :color="'success'"
            :icon="`${iconButton}`"
            class="mr-4"
            @click="validateForm"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import ButtonIcon from "./ButtonIcon.vue";
import APIDataService from "@/service/APIDataService";

export default {
  components: { ButtonIcon },
  name: "FormComponent",
  emits: ["sendForm"],
  props: {
    form: {
      type: Object,
    },
    payload: {
      type: Object,
    },
    buttonLabel: {
      type: String,
    },
    iconButton: {
      type: String,
      default: "mdi-content-save-outline",
    },
  },
  data() {
    return {
      valid: false,
      data: [],
      json: [],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },
  mounted() {
    this.json = this.payload;
  },
  methods: {
    validateCpfCnpj(value) {
      const numericValue = value.replace(/\D/g, "");

      if (/^\d{11}$/.test(numericValue) || /^\d{14}$/.test(numericValue)) {
        return true;
      } else {
        return "Insira um CPF ou CNPJ válido";
      }
    },

    saveData(key, event) {
      let value = event.target.value;
      this.data[key] = value;
      this.json[key] = value;
      if (key == "cep" && value.length == 9) {
        this.getCEP(value);
      }
    },

    loadData(response) {
      console.log("---------loadData FormComponent ------------");
      console.log(response);
      this.data = response;
      this.json = response;
    },

    async validateForm() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let json = JSON.stringify(this.json, null, 2);
        this.$emit("sendForm", json);
      }
    },

    resetFrom() {
      this.$refs.form.reset();
    },

    async getCEP(value) {
      this.data["endereco"] = "Carregando...";
      this.data["bairro"] = "Carregando...";
      this.data["cidade"] = "Carregando...";
      this.data["uf"] = "..";
      try {
        let response = await APIDataService.getCEP(value);
        this.data["endereco"] = response.logradouro;
        this.data["bairro"] = response.bairro;
        this.data["cidade"] = response.localidade;
        this.data["uf"] = response.uf;

        this.json["endereco"] = response.logradouro;
        this.json["bairro"] = response.bairro;
        this.json["cidade"] = response.localidade;
        this.json["uf"] = response.uf;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>