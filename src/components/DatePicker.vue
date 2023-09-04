<template>
    <div class="calendar-component" ref="datepicker" :class="{
        'calendar-component-opened': show,
    }">
        <InputComponent  @click="openCalendar" v-model="valueString" :place-holder="placeHolder" />
        <div class="calendar-container" v-if="show">
            <div class="calendar-header">
                <div class="arrow arrow-left" @click="monthClick(-1)">
                </div>
                <p class="list-text-bold">{{ months[now.month - 1] }} {{ now.year }}</p>

                <div class="arrow arrow-right" @click="monthClick(1)"></div>
            </div>
            <div class="calendar-days">
                <p class="calendar-day day-name" v-for="day in days" :key="day">
                    {{ day }}
                </p>
            </div>
            <div class="calendar-days" v-for="i in 6" :key="i">
                <p class="calendar-day" v-for="j in 7" :key="j"
                    :class="date[(i - 1) * 7 + (j - 1)] && date[(i - 1) * 7 + (j - 1)].status"
                    @click="pickDate((i - 1) * 7 + (j - 1))">
                    {{ date[(i - 1) * 7 + (j - 1)] && date[(i - 1) * 7 + (j - 1)].text }}
                </p>
            </div>
        </div>
    </div>
</template>
  
<script setup >
import { defineEmits, defineProps, onMounted, computed, ref, watch, nextTick } from "vue";
import MyDateTime from "@/extensions/MyDateTime";
import InputComponent from "./InputComponent.vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    format: String,
    placeHolder: String,
    modelValue: Object,
})



const show = ref(false);
const now = ref(MyDateTime.locationTime());
const date = ref([]);
const months = ref(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
const days = ref(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
const datepicker = ref();
console.log( new Date(), now.value)

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

const valueString = computed(() => {
    let stringValue = "";
    if (value.value == null) {
        stringValue = "--.--.----";
    } else {
        let stringifyVar = stringify(MyDateTime.parse(value.value.toString()) || MyDateTime.locationTime());
        let day = stringifyVar.substring(8, 10);
        let month = stringifyVar.substring(5, 7);
        let year = stringifyVar.substring(0, 4);
        stringValue = day + "." + month + "." + year;
    }

    return stringValue;
    
});



onMounted(() => {
    nextTick(() => {
        if (value.value && value.value.toString() == "Invalid DateTime") {
            now.value = MyDateTime.locationTime();
        } else {
            if (value.value) {
                now.value = MyDateTime.parse(value.value.toString()) || MyDateTime.locationTime();
            }
        }
    });
});

watch(now, () => {
    update();
});

watch(show, () => {
    update();
});

function openCalendar() {
    show.value = true;
    document.addEventListener("click", handleClickOutside);
}


function handleClickOutside(event) {
   if ( datepicker.value && !datepicker.value.contains(event.target)) {
    show.value = false;
  }
}


function update() {
    let arr = [];
    let time = now.value.set({ day: 1 });
    let curFirstDay = time.weekday;
    time = time.minus({ months: 1 }).endOf("month"); // the last day
    let lastDayCount = time.day;
    for (let i = curFirstDay - 1; i > 0; i--) {
        arr.push({
            text: lastDayCount - i + 1,
            time: time.set({ day: lastDayCount - i + 1 }),
            status: "date-pass",
        });
    }
    time = time.plus({ months: 1 }).endOf("month");
    let curDayCount = time.day;
    let value = valueString.value;
    for (let i = 0; i < curDayCount; i++) {
        let tmpTime = time.set({ day: i + 1 });
        let status = "";
        let valueMod = value.split(".");
        let valueModArr = valueMod[2] + "-" + valueMod[1] + "-" + valueMod[0];
        stringify(tmpTime) === valueModArr && (status = "date-active");
        stringify(MyDateTime.locationTime()) === stringify(tmpTime) && (status += " date-current");
        arr.push({
            text: i + 1,
            time: tmpTime,
            status: status,
        });
    }

    let j = 1;
    while (arr.length < 42) {
        arr.push({
            text: j,
            time: time.plus({ months: 1 }).set({ day: j }),
            status: "date-future",
        });
        j++;
    }


    date.value = arr;
}

function monthClick(flag) {
    now.value = now.value.set({ month: now.value.month + flag });
}

function pickDate(index) {
    if (date.value[index].status.includes("date-disabled")) return;
    now.value = date.value[index].time.set({ hour: 7, minute: 0 });
    emit("update:modelValue", now.value);
    show.value = false;
}

function stringify(time = now.value, format = props.format) {
    let year = time.year;
    let month = time.month;
    let date = time.day;
    let monthName = months.value[time.month - 1];

    const map = {
        YYYY: year,
        MMM: monthName,
        MM: ("0" + month).slice(-2),
        M: month,
        DD: ("0" + date).slice(-2),
        D: date,
    };

    return format.replace(/Y+|M+|D+/g, (str) => {
        if (str in map) {
            return map[str];
        }
        return str;
    });
}
</script>