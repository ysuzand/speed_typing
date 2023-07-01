import './styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdTimerOutlined } from 'oh-vue-icons/icons'

addIcons(MdTimerOutlined)

const app = createApp(App)
app.component('v-icon', OhVueIcon);
app.mount('#app')
