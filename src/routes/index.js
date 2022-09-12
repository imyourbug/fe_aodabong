// export default router
import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/clients/Login.vue";
import About from "@/views/clients/About.vue";
import Home from "@/views/clients/Home.vue";
import ProductDetail from "@/views/clients/ProductDetail.vue";
import Register from "@/views/clients/Register.vue";

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/products/detail/:id',
        name: 'ProductDetail',
        component: ProductDetail,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
]

const router = createRouter({ history: createWebHistory(), routes });

// Middleware
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('email')) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
