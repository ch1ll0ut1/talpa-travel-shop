import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import AdminOrdersView from '../views/AdminOrdersView.vue'
import { useAuthStore } from '@/stores/auth'
import AdminNewProduct from '@/views/AdminNewProduct.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import ThankYouView from '@/views/ThankYouView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/product/:id',
            name: 'product',
            component: ProductView,
            props: true,
        },
        {
            path: '/admin/login',
            name: 'admin-login',
            component: AdminLoginView,
            props: true,
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminOrdersView,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/products/new',
            name: 'new-product',
            component: AdminNewProduct,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: CheckoutView,
        },
        {
            path: '/thank-you',
            name: 'thank-you',
            component: ThankYouView,
        }
    ],
})

router.beforeResolve((to, from, next) => {
    const auth = useAuthStore();

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next({ name: 'admin-login' });
    } else {
        next();
    }
})

export default router
