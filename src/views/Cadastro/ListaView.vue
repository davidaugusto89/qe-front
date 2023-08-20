<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h2>Lista de Cadastros</h2>
      </v-col>
      <v-col cols="4" align-self="end" align="right">
        <btn-icon
          :text="'Filtrar'"
          :color="'blue-grey'"
          :icon="'mdi-text-search'"
          class="mr-5"
          @click="showModalSearch"
        />

        <btn-icon
          :text="'Adicionar Cadastro'"
          :color="'success'"
          :icon="'mdi-plus-circle-outline'"
          to="/cadastros/inserir"
        />
      </v-col>
    </v-row>
    <v-row class="my-10">
      <data-table
        :headers="headers"
        :data="data"
        @editItem="editItem"
        @infoItem="infoItem"
        @deleteItem="deleteItem"
      />
    </v-row>
  </v-container>
  <modal-dialog
    :title="`Filtrar Resultados`"
    :show="statusModalSearch"
    ref="modalSearch"
  >
    <template #content>
      <FormComponent
        :form="formSearchCadastro"
        :payload="payloadSearch"
        :button-label="'Filtrar'"
        :icon-button="'mdi-text-search'"
        @send-form="searchCadastro"
        ref="searchForm"
      />
    </template>
  </modal-dialog>

  <modal-dialog
    :title="`Detalhes Cadastro #${dataModal.id}`"
    :show="statusModal"
    ref="modalInfo"
  >
    <template #content>
      <v-row>
        <v-col cols="6">
          <stron>ID: </stron> <span>{{ dataModal.id }}</span> <br />
          <stron>Nome: </stron> <span>{{ dataModal.nome }}</span> <br />
          <stron>CPF/CNPJ: </stron> <span>{{ dataModal.cpf_cnpj }}</span> <br />
          <stron>Fone: </stron> <span>{{ dataModal.fone }}</span> <br />
          <stron>Limite Crédito: </stron>
          <span>R$ {{ $formatMoney(dataModal.limite_credito) }}</span> <br />
          <stron>Validade: </stron>
          <span>{{ $formatDateBR(dataModal.validade) }}</span> <br />
        </v-col>
        <v-col cols="6">
          <stron>CEP: </stron> <span>{{ dataModal.cep }}</span> <br />
          <stron>Logradouro: </stron> <span>{{ dataModal.logradouro }}</span>
          <br />
          <stron>Endereço: </stron> <span>{{ dataModal.endereco }}</span> <br />
          <stron>Numero: </stron> <span>{{ dataModal.numero }}</span> <br />
          <stron>Complemento: </stron> <span>{{ dataModal.complemento }}</span>
          <br />
          <stron>Cidade: </stron> <span>{{ dataModal.cidade }}</span> |
          <stron>UF: </stron> <span>{{ dataModal.uf }}</span>
        </v-col>
      </v-row>
    </template>
  </modal-dialog>
</template>

<script>
import { defineComponent } from "vue";
import APIDataService from "@/service/APIDataService";
import { computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ListaView",
  setup() {
    const store = useStore();
    const formSearchCadastro = computed(() => store.state.formSearchCadastro);
    return {
      formSearchCadastro,
    };
  },
  data() {
    return {
      statusModal: false,
      statusModalSearch: false,
      dataModal: [],
      headers: [
        { title: "ID", align: "start", key: "id" },
        { title: "Código", align: "start", key: "codigo" },
        { title: "Nome", align: "start", key: "nome" },
        { title: "CPF/CNPJ", align: "start", key: "cpf_cnpj" },
        { title: "UF", align: "start", key: "cidade" },
        { title: "UF", align: "start", key: "uf" },
        { title: "CEP", align: "start", key: "cep" },
        { text: "Ações", key: "actions", sortable: false },
      ],
      data: [],
      payloadSearch: {
        codigo_search: "",
        nome_search: "",
        cep_search: "",
        cidade_search: "",
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        let response = await APIDataService.getAll();
        this.data = response.data;
      } catch (error) {
        console.error(error.message);
      }
    },
    editItem(id) {
      this.$router.push(`/cadastros/editar/${id}`);
    },
    async infoItem(id) {
      try {
        let response = await APIDataService.getID(id);
        this.dataModal = response.data;
        this.$refs.modalInfo.toogleModal();
      } catch (error) {
        this.$swal.fire({
          title: "Erro!",
          text: "Ocorreu um erro ao tentar exibir mais detalhes do Cadastro.",
          icon: "error",
        });
      }
    },
    async deleteItem(id) {
      const result = await this.$swal.fire({
        title: "Confirmar Exclusão",
        text: `Tem certeza que deseja excluir este Cadastro #${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, excluir",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        try {
          let response = await APIDataService.delete(id);
          await this.$swal({
            icon: "success",
            title: "Excluído!",
            text: response.data.message,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
          });
          this.loadData();
        } catch (error) {
          this.$swal.fire({
            title: "Erro!",
            text: "Ocorreu um erro ao tentar excluir o item.",
            icon: "error",
          });
        }
      }
    },
    showModalSearch() {
      this.$refs.modalSearch.toogleModal();
      if (this.statusModalSearch) {
        setTimeout(() => {
          this.$refs.searchForm.loadData(this.payloadSearch);
        }, 100);
      }
      this.statusModalSearch = true;
    },

    async searchCadastro(formData) {
      let json = JSON.parse(formData);
      let params = "";
      params += json["codigo_search"] ? "&codigo=" + json["codigo_search"] : "";
      params += json["nome_search"] ? "&nome=" + json["nome_search"] : "";
      params += json["cep_search"] ? "&cep=" + json["cep_search"] : "";
      params += json["cidade_search"] ? "&cidade=" + json["cidade_search"] : "";
      params = params ? params.replace("&", "?") : "";

      if (params) {
        try {
          let response = await APIDataService.getSearch(params);
          if (response.data.length) {
            this.data = response.data;
            this.$refs.modalSearch.toogleModal();
          } else {
            this.$refs.modalSearch.toogleModal();
            this.$swal.fire({
              title: "Aviso",
              text: "Nenhum resultado encontrado para o filtro informado.",
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
              allowOutsideClick: false,
              icon: "error",
            });
          }
        } catch (error) {
          console.error(error.message);
        }
      } else {
        this.$refs.modalSearch.toogleModal();
        this.loadData();
      }
    },
  },
});
</script>
