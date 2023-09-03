
<template>
    <div class="add-event">

        <InputComponent v-model="event.name" :placeHolder="'Event Name'" :class="{ 'is-invalid': v$.name.$error }">
        </InputComponent>
        <InputComponent v-model="event.description" :placeHolder="'Event Description'"
            :class="{ 'is-invalid': v$.description.$error }"></InputComponent>

        <DatePicker v-model="event.start_date" :width="'90px'" :format="'YYYY-MM-DD'" :placeHolder="'Start date'"
            :class="{ 'is-invalid': v$.start_date.$error }">
        </DatePicker>
        <TimePicker v-model="event.start_time" :timeFrom="startOfDay" :minute-interval="5" :timeTo="endOfDay"
            :placeHolder="'Start Time'" :class="{ 'is-invalid': v$.start_time.$error }">
        </TimePicker>
        <DatePicker v-model="event.end_date" :width="'90px'" :format="'YYYY-MM-DD'" :placeHolder="'End date'"
            :class="{ 'is-invalid': v$.end_date.$error }">
        </DatePicker>
        <TimePicker v-model="event.end_time" :timeFrom="startOfDay" :minute-interval="5" :timeTo="endOfDay"
            :placeHolder="'End Time'" :class="{ 'is-invalid': v$.end_time.$error }">
        </TimePicker>
        <button type="submit" @click="addEvent" v-if="!route.params.id"> Add Event</button>
        <button v-else @click="editEvent"> Edit Event</button>


        <div class="success-message">
            {{ successMessage }}
        </div>


    </div>
</template>


<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required } from "@vuelidate/validators";
import { useRoute } from "vue-router";
import InputComponent from '@/components/InputComponent.vue';
import TimePicker from "@/components/TimePicker.vue";
import DatePicker from "@/components/DatePicker.vue";
import { v4 as uuidv4 } from 'uuid';
import router from "@/router";

const event = ref({ start_time: {}, end_time: {} })
const events = ref([]);
const startOfDay = ref(6);
const endOfDay = ref(22);
const successMessage = ref();
const route = useRoute();

if (route.params.id) {
    let events = JSON.parse(localStorage.getItem("events"));
    event.value = events.find((element) => element.id === route.params.id);

}
const rules = computed(() => {
    const localRules = {
        name: {
            required,
        },
        description: {
            required,
        },
        start_date: {
            required,
        },
        start_time: {
            required,
        },
        end_date: {
            required,
        },
        end_time: {
            required,
        },
    };

    return localRules;
});

const v$ = useVuelidate(rules, event.value);



function addEvent() {
    v$.value.$touch();

    if (v$.value.$invalid) {
        return;
    }


    event.value.id = uuidv4();
    events.value.push(event.value);

    // Concatenate the events from local storage and update events.value
    events.value = events.value.concat(JSON.parse(localStorage.getItem("events")));

    // Store the updated events array in local storage
    localStorage.setItem("events", JSON.stringify(events.value));

    successMessage.value = 'event added successfully!';

    setTimeout(() => {
        successMessage.value = null;
        event.value = {};
    }, 200)

}

function editEvent() {
    let indexOfEditElem = events.value.findIndex(element => element.id === router.params.id);
    events.value[indexOfEditElem] = event.value;
    localStorage.setItem("events", JSON.stringify(events.value));
    successMessage.value = 'event edited successfully!';
}



</script>


