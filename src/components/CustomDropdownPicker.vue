<template>
    <div class="dropdown-picker" ref="dropdownComponent">
        <ul>
            <li v-for="(option, index) in options" :key="index" :class="{ 'picked-value': option.value === modelValue }">
                <input :type="'radio'" :value="option.value" :id="option.value + '_' + index" v-model="value" />
                <label :for="option.value + '_' + index" :title="option">{{ option.value }}</label>
            </li>
        </ul>
    </div>
</template>
<script setup>
import {
    defineEmits,
    defineProps,
    onMounted,
    computed,

} from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: String,
    options: Object,
    valueKey: String,
})


let value = computed({
    get() {

        for (let i = 0; i < props.options.length; i++) {
            if (props.options[i][props.valueKey] === props.modelValue) {
                return props.options[i];
            }
        }
        return null;

    },
    set(val) {
        emit("update:modelValue", val);
    },
});

onMounted(() => {
    checkLength();
});

function checkLength() {
    if (props.options.length == 1) {
        value = props.options[0];
    }
}


</script>

