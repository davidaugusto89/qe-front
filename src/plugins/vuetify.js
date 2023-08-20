// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDataTable } from 'vuetify/labs/VDataTable'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  lang: {
    current: 'pt',
    dataTable: {
      rowsPerPageText: 'Linhas por página',
      pageText: '{0}-{1} de {2}',
    },
  },
  components: {
    VDataTable,
  },
  defaults: {
    VDataTable: {
      fixedHeader: true,
      noDataText: 'Nenhum resultado encontrado'
    },
  },
  theme: {
    defaultTheme: 'dark'
  }
})