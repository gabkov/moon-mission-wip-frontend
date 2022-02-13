import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Moralis from './plugins/moralis'
import './index.css'

import { library } from "@fortawesome/fontawesome-svg-core";
//import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.provide('$moralis', Moralis)
.use(store)
.use(router)
.mount('#app')