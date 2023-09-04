
<template>
    <template v-if="events && events.length > 0">
        <InputComponent v-model="searchEvents" :place-holder="'search'"></InputComponent>

        <table class="events-list table">
            <caption>List of Events</caption>
            <thead class="table-header">
                <tr class="table-row">
                    <th scope="col">Event name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-row" v-for="event in filteredEventList()" :key="event.id">
                    <td class="table-data">{{ event.name }}</td>
                    <td class="table-data" v-if="event.start_date">
                        {{ (event.start_date).split('T')[0] }} {{ event.start_time.hour }}:
                        {{ event.start_time.minute }} <br> {{ (event.end_date).split('T')[0] }}
                        {{ event.end_time.hour }}: {{ event.end_time.minute }}</td>
                    <td class="table-data">{{ event.description }}</td>
                    <td class="table-data"><router-link :to="{ name: 'AddEvent', params: { id: event.id } }"
                            class="edit">Edit</router-link>
                    </td>
                    <td class="table-data"><button @click="selectDeleteEvent(event)" class="delete">Delete</button></td>
                </tr>

            </tbody>

        </table>
    </template>
    <template v-else>
        <div class="no-events-available"> Currently, there are no events available</div>

    </template>
    <div class="popup-overlay" v-if="deleteEvtOccured">
        <div class="popup">
            <h1>Are you sure you want to delete {{ eventToBeDeleted.name }} ?</h1>
            <div class="buttons-wrapper">
                <button @click="deleteEvent" class="delete">Yes</button>
                <button @click="deleteEvtOccured = !deleteEvtOccured" class="edit">No</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import InputComponent from '@/components/InputComponent.vue';
import { ref, onMounted } from 'vue';

const eventToBeDeleted = ref(null);
const deleteEvtOccured = ref(false);
const events = ref([]);

const searchEvents = ref('');

onMounted(() => {
    fetchEvents();
})




function filteredEventList() {
    return events.value.filter((event) => {
        return event.name.toLowerCase().includes(searchEvents.value.toLowerCase()) || event.description.toLowerCase().includes(searchEvents.value.toLowerCase()) || event.start_date.toLowerCase().includes(searchEvents.value.toLowerCase());

    });
}

function fetchEvents() {
    events.value = JSON.parse(localStorage.getItem('events'));
    console.log(JSON.parse(localStorage.getItem('events')))
}
function selectDeleteEvent(event) {
    deleteEvtOccured.value = !deleteEvtOccured.value;
    eventToBeDeleted.value = event;
}

function deleteEvent() {
    let eventsLocalStorage = JSON.parse(localStorage.getItem('events'));
    const itemIdToRemove = eventToBeDeleted.value.id;
    const indexToRemove = eventsLocalStorage.findIndex(item => item.id === itemIdToRemove);
    if (indexToRemove !== -1) {
        eventsLocalStorage.splice(indexToRemove, 1);
    }
    localStorage.setItem("events", JSON.stringify(eventsLocalStorage));
    events.value = JSON.parse(localStorage.getItem('events'));
    deleteEvtOccured.value = !deleteEvtOccured.value;

}

</script>


<style scoped></style>
