<template>
    <form @submit.prevent="login">
        <InputComponent v-model="user.username" :placeHolder="'Username'" :class="{ 'is-invalid': v$.username.$error }">
        </InputComponent>
        <InputComponent v-model="user.password" :placeHolder="'Password'" :inputType="'password'"
            :class="{ 'is-invalid': v$.password.$error }"></InputComponent>
        <button type="submit">Login</button>
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

    let localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser) {
        if (localStorageUser.username == user.username && localStorageUser.password == user.password) {
            localStorage.setItem('isLoggedIn', 'true');
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
