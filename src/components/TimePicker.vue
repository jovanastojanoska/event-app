<template>
  <div class="time-picker-component" ref="parentComponent">
    <InputComponent :model-value="displayTime" @click="openDropdown" :place-holder="placeHolder" :read-only="true" />
    <div class="time-picker-dropdowns" v-if="showDropdown">
      <div class="time-picker-dropdown">
        <CustomDropdownPicker v-model="selectedHour" :options="hours" :list-title="hourType" />
      </div>
      <div class="time-picker-dropdown">
        <CustomDropdownPicker v-model="selectedMinute" :options="minutes" :list-title="minuteType" />
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  defineEmits,
  defineProps,
  computed,
  ref,
} from "vue";

import InputComponent from "@/components/InputComponent.vue";
import CustomDropdownPicker from "@/components/CustomDropdownPicker.vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: Object,
  minuteInterval: Number,
  timeFrom: Number,
  timeTo: Number,
  placeHolder: String
})

const parentComponent = ref();

const hours = computed(() => {
  const hoursArray = [];
  for (let i = props.timeFrom; i < props.timeTo; i++) {
    hoursArray.push({ value: formatValue(i), name: formatValue(i) });
  }
  return hoursArray;
});

const minutes = computed(() => {
  const minutesArray = [];
  let interval = props.minuteInterval;
  if (interval === 0) {
    interval = 60;
  } else if (!interval) {
    interval = 1;
  }
  for (let i = 0; i < 60; i += interval) {
    minutesArray.push({ value: formatValue(i), name: formatValue(i) });
  }
  return minutesArray;
});

const selectedHour = computed({
  get() {
    return props.modelValue?.hour ?? "--";
    // return props.modelValue?.hour ?? formatValue(props.timeFrom);
  },
  set(value) {
    emit("update:modelValue", {
      hour: value,
      minute: props.modelValue?.minute,
    });
  },
});

const selectedMinute = computed({
  get: () => props.modelValue?.minute ?? "--",
  // get: () => props.modelValue?.minute ?? formatValue(0),
  set: (value) => {
    emit("update:modelValue", {
      hour: props.modelValue?.hour,
      minute: value,
    });
  },
});

const hourType = computed(() => {
  return "HH";
});

const minuteType = computed(() => {
  return "MM";
});

const displayTime = computed(() => {

  return `${selectedHour.value}:${selectedMinute.value}`;
});


const showDropdown = ref(false);
function formatValue(i) {
  return i < 10 ? `0${i}` : String(i);
}
function openDropdown() {
  showDropdown.value = true;
  document.addEventListener("click", handleClickOutside)
}

function handleClickOutside(event) {
   if ( parentComponent.value && !parentComponent.value.contains(event.target)) {
    showDropdown.value = false;
  }
}




</script>

<style>
.time-picker {
  display: inline-block;
  position: relative;
  font-size: 1em;
  font-family: sans-serif;
  vertical-align: middle;
}

.time-picker * {
  box-sizing: border-box;
}

.time-picker .time-picker-overlay {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.time-picker .dropdown {
  position: absolute;
  z-index: 5;
  /* top: 33px; */
  left: 0;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 27vh;
  font-weight: normal;
  z-index: 201;
}

.time-picker .dropdown .select-list {
  width: 100%;
  height: 27vh;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: space-between;
  z-index: 200;
}

.time-picker .dropdown ul {
  padding: 0;
  margin: 0;
  list-style: none;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

.time-picker .dropdown ul.minutes,
.time-picker .dropdown ul.seconds,
.time-picker .dropdown ul.apms {
  border-left: 1px solid #fff;
}

.time-picker .dropdown ul li {
  text-align: center;
  padding: 0.3em 0;
  color: #161616;
  justify-content: center;
  font-size: 1.5rem;
}

.time-picker .dropdown ul li:not(.hint):hover {
  background: rgba(0, 0, 0, 0.08);
  color: #161616;
  cursor: pointer;
}

.time-picker .dropdown ul li.active,
.time-picker .dropdown ul li.active:hover {
  background-color: #002E2C;
  color: #fff;
}

.time-picker .dropdown .hint {
  background: #002E2C;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
}
</style>