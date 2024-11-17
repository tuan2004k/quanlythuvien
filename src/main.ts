import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.css';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
// import { aliases, fa } from 'vuetify/iconsets/fa4'



import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
  })
  export default createVuetify({
    icons: {
      defaultSet: 'mdi',
    },
     
  })  

app.use(createPinia())
app.use(router)

app.mount('#app')
app.use(vuetify)

