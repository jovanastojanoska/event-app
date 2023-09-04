<template>
    <EventsList v-if="isLoggedIn"></EventsList>
    <div v-else>
        <div class="hero"></div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import EventsList from './EventsList.vue';
import { useAuthStore } from "@/store";

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);

</script>





