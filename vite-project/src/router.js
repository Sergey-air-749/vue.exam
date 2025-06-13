import { createRouter, createWebHistory } from "vue-router";

import login from './components/login.vue'
import registration from './components/registration.vue'
import home from './components/home.vue'
import categories from './components/categories.vue'
import transactions from './components/transactions.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/registration',
        name: 'registration',
        component: registration
    },
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/categories',
        name: 'categories',
        component: categories
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: transactions
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router