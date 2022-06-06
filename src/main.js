import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Web3 from 'web3'

const web3 = new Web3(
  Web3.givenProvider || 'wss://some.local-or-remote.node:8546'
)
console.log({ web3 })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
