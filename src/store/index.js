import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      formCadastro: {
        rows: [
          {
            fields: [
              {
                model: "codigo",
                label: "Código",
                size: 2,
                type: "text",
                mask: "###############",
                required: true,
                maxlenght: 15,
                rules: [
                  (v) => !!v || "Campo obrigatório",
                  (v) => (v || "").length <= 15 || "Máximo de 15 caracteres",
                ],
              },
              {
                model: "nome",
                label: "Nome",
                size: 7,
                type: "text-no-mask",
                required: true,
                maxlenght: 150,
                rules: [
                  (v) => !!v || "Campo obrigatório",
                  (v) => (v || "").length <= 150 || "Máximo de 150 caracteres",
                ],
              },
              {
                model: "cpf_cnpj",
                label: "CPF/CNPJ",
                mask: ["###.###.###-##", "##.###.###/####-##"],
                size: 3,
                type: "cpf_cnpj",
                required: true,
              },
            ],
          },
          {
            fields: [
              {
                model: "cep",
                label: "CEP",
                size: 2,
                type: "text",
                required: true,
                mask: "#####-###",
                maxlenght: 150,
                rules: [
                  (v) => !!v || "Campo obrigatório",
                  (v) => (v || "").length == 9 || "CEP inválido",
                ],
              },
              {
                model: "logradouro",
                label: "Logradouro",
                size: 2,
                maxlenght: 2,
                type: "select",
                required: true,
                options: ["Rua", "Avenida", "Praça", "Alameda", "Travessa", "Estrada", "Beco", "Rodovia", "Viaduto", "Largo", "Passarela", "Ladeira", "Acesso"],
                rules: [
                  (v) => !!v || "Campo obrigatório"
                ],
              },
              {
                model: "endereco",
                label: "Endereço",
                size: 4,
                type: "text-no-mask",
                required: true,
                maxlenght: 100,
                rules: [(v) => !!v || "Campo obrigatório"],
              },
              {
                model: "numero",
                label: "Nº",
                size: 2,
                type: "text-no-mask",
                required: true,
                maxlenght: 20,
                rules: [(v) => !!v || "Campo obrigatório"],
              },
              {
                model: "complemento",
                label: "complemento",
                size: 2,
                type: "text-no-mask",
                maxlenght: 20,
              },
            ],
          },
          {
            fields: [
              {
                model: "bairro",
                label: "Bairro",
                size: 5,
                type: "text-no-mask",
                required: true,
                maxlenght: 50,
                rules: [(v) => !!v || "Campo obrigatório"],
              },
              {
                model: "cidade",
                label: "Cidade",
                size: 5,
                type: "text-no-mask",
                required: true,
                maxlenght: 60,
                rules: [(v) => !!v || "Campo obrigatório"],
              },
              {
                model: "uf",
                label: "UF",
                size: 2,
                maxlenght: 2,
                type: "select",
                required: true,
                options: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
                rules: [
                  (v) => !!v || "Campo obrigatório",
                ],
              },
            ],
          },
          {
            fields: [
              {
                model: "fone",
                label: "Fone",
                mask: ["(##) ####-####", "(##) #####-####"],
                size: 4,
                type: "text",
                required: true,
                maxlenght: 15,
                rules: [(v) => !!v || "Campo obrigatório"],
              },
              {
                model: "limite_credito",
                label: "Limite Credito",
                size: 4,
                type: "money",
                required: true,
                maxlenght: 17,
              },
              {
                model: "validade",
                label: "Validade",
                size: 4,
                type: "text",
                mask: "##/##/####",
                required: true,
                rules: [
                  (v) => !!v || "Campo obrigatório",
                  (v) =>
                    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
                      v
                    ) || "Data inválida",
                ],
              },
            ],
          },
        ],
      },

      formSearchCadastro: {
        rows: [
          {
            fields: [
              {
                model: "codigo_search",
                label: "Código",
                size: 6,
                type: "text",
                mask: "###############",
                maxlenght: 15,
              },
              {
                model: "nome_search",
                label: "Nome",
                size: 6,
                type: "text-no-mask",
                maxlenght: 150,
              },
              {
                model: "cep_search",
                label: "CEP",
                size: 6,
                type: "text",
                mask: "#####-###",
                maxlenght: 150,
              },
              {
                model: "cidade_search",
                label: "Cidade",
                size: 6,
                type: "text-no-mask",
                maxlenght: 60,
              },
            ]
          }
        ]
      }
    };
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
