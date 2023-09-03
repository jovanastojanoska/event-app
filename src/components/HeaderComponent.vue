<template>
    <header>
        <nav>
            <router-link to="/" class="logo"><img src="@/assets/logo.svg" alt="logo"></router-link>
            <div class="header-menu">
                <router-link to="add-event"  v-if="isAuthenticated"> Add event</router-link>
                <router-link to="register" v-if="!isAuthenticated" > Register </router-link>
                <router-link to="login" v-if="!isAuthenticated" >Login</router-link>
                <button @click="logout" v-else> Logout</button>
            </div>
        </nav>
    </header>
</template>

<script setup>
import{ ref ,onMounted} from "vue";
import router from '@/router';

const isAuthenticated = ref(false);

onMounted(()=>{
    let localStorageUser = JSON.parse(localStorage.getItem('isLoggedIn'));
    if(localStorageUser){
        isAuthenticated.value = true;
    }
    
})


function logout() {
    localStorage.removeItem('isLoggedIn');
    isAuthenticated.value = false;
    router.push('/');
  
}



</script>