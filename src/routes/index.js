// export default router
import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue";
import About from "../views/About.vue";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        },
    },
    // {
    //     path: '/products/:menu_id',
    //     name: 'Product-Menu',
    //     component: GroupProduct,
    //     meta: {
    //         requiresAuth: true
    //     },
    // },
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
