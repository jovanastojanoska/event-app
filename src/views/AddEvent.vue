
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
        <button type="submit" @click="addEvent" v-if="!route.params.id" class="submit"> Add Event</button>
        <button v-else @click="editEvent" class="edit"> Edit Event</button>


        <div class="success-message" v-if="successMessage">
            {{ successMessage }}
        </div>


    </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required } from "@vuelidate/validators";
import { useRoute } from "vue-router";
import InputComponent from '@/components/InputComponent.vue';
import TimePicker from "@/components/TimePicker.vue";
import DatePicker from "@/components/DatePicker.vue";
import { v4 as uuidv4 } from 'uuid';


const event = ref({ start_time: {}, end_time: {} })
const events = ref([]);
const startOfDay = ref(6);
const endOfDay = ref(22);
const successMessage = ref();
const route = useRoute();
const indexOfEditElem = ref(null)

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
    if (JSON.parse(localStorage.getItem("events"))) {
        events.value = events.value.concat(JSON.parse(localStorage.getItem("events")));
    }

    localStorage.setItem("events", JSON.stringify(events.value));

    successMessage.value = 'event added successfully!';

    setTimeout(() => {
        successMessage.value = null;
        event.value = {};
    }, 1000)

}

function editEvent() {
    events.value[indexOfEditElem.value] = event.value;
    localStorage.setItem("events", JSON.stringify(events.value));
    successMessage.value = 'event edited successfully!';
    setTimeout(() => {
        successMessage.value = null;
        event.value = {};
    }, 1000)

}


onMounted(() => {
    if (route.params.id) {
        events.value = JSON.parse(localStorage.getItem("events"));
        indexOfEditElem.value = events.value.findIndex(object => {
            return object.id === route.params.id;
        });

    }
})


</script>


