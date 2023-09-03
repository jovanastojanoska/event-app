<template>
    <EventsList v-if="isAuthenticated"></EventsList>
    <div v-else>ndandnasnas</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const isAuthenticated = ref(false);

onMounted(() => {
    let localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser) {
        isAuthenticated.value = true;
    }

})
import EventsList from './EventsList.vue';


</script>