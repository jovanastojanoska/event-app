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
  if (parentComponent.value && !parentComponent.value.contains(event.target)) {
    showDropdown.value = false;
  }
}




</script>

