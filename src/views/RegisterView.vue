<template>
    <form @submit.prevent="register">
        <InputComponent v-model="user.first_name" :placeHolder="'First name'"
            :class="{ 'is-invalid': v$.first_name.$error }"></InputComponent>
        <InputComponent v-model="user.last_name" :placeHolder="'Last name'" :class="{ 'is-invalid': v$.last_name.$error }">
        </InputComponent>
        <InputComponent v-model="user.username" :placeHolder="'Username'" :class="{ 'is-invalid': v$.username.$error }">
        </InputComponent>
        <InputComponent v-model="user.email" :placeHolder="'Email'" :inputType="'email'"
            :class="{ 'is-invalid': v$.email.$error }"></InputComponent>
        <InputComponent v-model="user.phone" :placeHolder="'Phone'" :inputType="'phone'"
            :class="{ 'is-invalid': v$.phone.$error }"></InputComponent>
        <InputComponent v-model="user.password" :placeHolder="'Password'" :inputType="'password'"
            :class="{ 'is-invalid': v$.password.$error }"> </InputComponent>
        <button type="submit" class="register">Register</button>
        <div class="error-message" v-if="error">{{ error }} </div>
        <div class="error-message" v-if="v$.password.$error && v$.password.minLength.$message">Password field should be 8
            characters long</div>


    </form>
</template>


<script setup>
import router from '@/router';
import { computed, reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from "@vuelidate/validators";
import InputComponent from '@/components/InputComponent.vue';

const users = ref([]);
const user = reactive({ first_name: "", last_name: "", username: "", email: "", phone: "", password: "" })
const error = ref("");
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
            minLength: minLength(8)

        },
    };

    return localRules;
});
const v$ = useVuelidate(rules, user);


function register() {
    v$.value.$touch();

    if (v$.value.$invalid) {
        return;
    }
    users.value.push(user);
    if (JSON.parse(localStorage.getItem("users"))) {
        users.value = users.value.concat(JSON.parse(localStorage.getItem("users")));
    }
    let userAlreadyExists = JSON.parse(localStorage.getItem("users")).find((element) => element.username === user.username);
    if (userAlreadyExists) {
        error.value = 'Username taken!'
    }
    else {

        localStorage.setItem("users", JSON.stringify(users.value));
        console.log(JSON.parse(localStorage.getItem("users")), 'users od local storage')
        router.push({ name: 'LoginView' })
    }

}
</script>



