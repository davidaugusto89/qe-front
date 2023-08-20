import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import helper from './helper'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import ButtonIcon from './components/ButtonIcon.vue'
import DataTable from './components/DataTable.vue'
import FormComponent from './components/FormComponent.vue'
import ModalDialog from './components/ModalDialog.vue'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueTheMask from 'vue-the-mask'
import money from 'v-money'

loadFonts()

const app = createApp(App)

app.component("btn-icon", ButtonIcon);
app.component("data-table", DataTable);
app.component("FormComponent", FormComponent);
app.component('modal-dialog', ModalDialog);

app.use(VueSweetalert2);

app.use(router)
app.use(store)
app.use(helper)
app.use(vuetify)
app.use(VueTheMask)
app.use(money, { precision: 2 })

app.mount('#app')
