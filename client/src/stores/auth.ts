import router from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
    username: string;
}

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);
    const user = ref<User | null>(null);

    function login(username: string, password: string) {
        if (username === 'admin' && password === 'password') {
            isAuthenticated.value = true;
            user.value = { username };

            router.replace({ name: 'admin' });
        } else {
            throw new Error('Invalid credentials');
        }
    }

    return {
        isAuthenticated,
        user,
        login,
    };
}, {
    persist: true,
});
