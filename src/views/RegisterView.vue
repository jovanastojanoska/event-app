<template>
    <form @submit.prevent="register">
        <InputComponent v-model="user.first_name" :placeHolder="'First name'" :class="{ 'is-invalid': v$.first_name.$error }"></InputComponent>
        <InputComponent v-model="user.last_name" :placeHolder="'Last name'" :class="{ 'is-invalid': v$.last_name.$error }"></InputComponent>
        <InputComponent v-model="user.username" :placeHolder="'Username'" :class="{ 'is-invalid': v$.username.$error }"></InputComponent>
        <InputComponent v-model="user.email" :placeHolder="'Email'" :inputType="'email'" :class="{ 'is-invalid': v$.email.$error }"></InputComponent>
        <InputComponent v-model="user.phone" :placeHolder="'Phone'" :inputType="'phone'" :class="{ 'is-invalid': v$.phone.$error }"></InputComponent>
        <InputComponent v-model="user.password" :placeHolder="'Password'" :inputType="'password'" :class="{ 'is-invalid': v$.password.$error }"></InputComponent>
        <button type="submit">Register</button>

    </form>
</template>


<script setup>
import router from '@/router';
import {  computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required } from "@vuelidate/validators";
import InputComponent from '@/components/InputComponent.vue';
const user = reactive({ first_name: "", last_name: "", username: "", email: "", phone: "", password: "" })
const rules = computed(() => {
    const localRules = {
        first_name: {
            required,
        },
        last_name: {
            required,
        },
        username: {
            required,
        },
        email: {
            required,
        },
        phone: {
            required,
        },
        password: {
            required,
        },
    };

    return localRules;
});
const v$ = useVuelidate(rules, user);


function register() {
    v$.value.$touch();
    console.log(v$.value)
    if (v$.value.$invalid) {
        return;
    }
    localStorage.setItem("user", JSON.stringify(user));
    router.push({ name: 'LoginView' })

}
</script>



