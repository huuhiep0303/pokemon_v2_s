import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router';
import Detail from './components/PokemonDetail/Detail.vue';
import Home from './components/Home.vue';


const routes = [
    {path: '/', component: Home},
    {path: '/:name', component: Detail},
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
  .use(router)
  .mount('#app') 
