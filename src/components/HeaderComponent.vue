<template>
    <header>
        <nav>
            <router-link to="/" class="logo"><img src="@/assets/logo.svg" alt="logo"></router-link>
            <div class="header-menu">
                <router-link to="add-event" class="add-event-btn" v-if="isLoggedIn"> Add event</router-link>
                <router-link to="register" class="register" v-if="!isLoggedIn"> Register </router-link>
                <router-link to="login" class="login" v-if="!isLoggedIn">Login</router-link>
                <button @click="logout" v-else class="logout"> Logout</button>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/store";
import router from "@/router";


const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);



function logout() {
    localStorage.removeItem('isLoggedIn');
    authStore.setLoggedIn(false);
    router.push('/');
}


</script>