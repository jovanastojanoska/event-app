
<template>
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
          
            <tr class="table-row" v-for="event in events" :key="event.id">
                <td class="table-data">{{ event.name }}</td>
                <td class="table-data" v-if="event.start_date">{{ (event.start_date).split('T')[0] }} {{
                    event.start_time.hour }} : {{
        event.start_time.minute }} - {{ (event.end_date).split('T')[0] }} {{
        event.end_time.hour }} {{ event.end_time.minute }}</td>
                <td class="table-data">{{ event.description }}</td>
                <td class="table-data"><router-link :to="{ name: 'AddEvent', params: { id: event.id } }"
                        class="edit">Edit</router-link>
                </td>
                <td class="table-data"><button @click="deleteEvent(event)" class="delete">Delete</button></td>
            </tr>

        </tbody>

    </table>
    <template v-if="deleteEvtOccured">
        <div id="overlay"></div>
        <div id="popup">
            <div class="popupcontent">
                <h1>Are you sure you want to delete {{ eventToBeDeleted.name }} ?</h1>
                <button>Y</button>
                <button>N</button>
            </div>
        </div>
    </template>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const eventToBeDeleted = ref(null);
const deleteEvtOccured = ref(false);
const events = ref();

onMounted(() => {
    fetchEvents();
})

function fetchEvents() {
    events.value = JSON.parse(localStorage.getItem('events'));
    console.log(JSON.parse(localStorage.getItem('events')))
}
function deleteEvent(event) {
    let events = JSON.parse(localStorage.getItem('events'));
    const itemIdToRemove = event.id;
    const indexToRemove = events.findIndex(item => item.id === itemIdToRemove);
    if (indexToRemove !== -1) {
        events.splice(indexToRemove, 1);
    }
    localStorage.setItem("events", JSON.stringify(events));
    events.value = JSON.parse(localStorage.getItem('events'));
    deleteEvtOccured.value = !deleteEvtOccured.value;
    eventToBeDeleted.value = event.name;

}

</script>


<style scoped></style>
