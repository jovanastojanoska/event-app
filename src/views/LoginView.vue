<template>
    <form @submit.prevent="login">
        <InputComponent v-model="user.username" :placeHolder="'Username'" :class="{ 'is-invalid': v$.username.$error }">
        </InputComponent>
        <InputComponent v-model="user.password" :placeHolder="'Password'" :inputType="'password'"
            :class="{ 'is-invalid': v$.password.$error }"></InputComponent>
        <button type="submit" class="login">Login</button>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
    </form>
</template>



<script setup>
import { ref } from "vue";
import InputComponent from '@/components/InputComponent.vue';
import router from '@/router';
import { computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required } from "@vuelidate/validators";
import { useAuthStore } from "@/store";


const authStore = useAuthStore();


const user = reactive({ username: "", password: "" });
const errorMessage = ref("")

const rules = computed(() => {
    const localRules = {
        username: {
            required,
        },
        password: {
            required,
        },
    };

    return localRules;
});

const v$ = useVuelidate(rules, user);


function login() {
    v$.value.$touch();
    if (v$.value.$invalid) {
        return;
    }

    let localStorageUsers = JSON.parse(localStorage.getItem('users'));
    if (localStorageUsers) {
        let userFound = localStorageUsers.find((element) => element.username === user.username);
        if (userFound.username == user.username && userFound.password == user.password) {
            localStorage.setItem('isLoggedIn', 'true');
            authStore.setLoggedIn(true);
            router.push({ name: 'EventsList' });

        } else {
            errorMessage.value = 'Wrong credentails';
        }
    }
    else {
        errorMessage.value = 'Please create an account';
    }

}

</script>



<style scoped></style>
