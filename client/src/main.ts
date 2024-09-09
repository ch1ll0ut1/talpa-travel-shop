import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client/core'

const app = createApp(App)

// Setup Pinia state management
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// Setup Router
app.use(router)

// Setup Graphql client
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
