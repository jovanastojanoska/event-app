<template>
    <div class="input-component">
        <input :type="inputType" placeholder=" " :id="'input' + id" v-model="val" ref="inputComponent" />
        <label :for="'input' + id">{{ placeHolder }} </label>

    </div>
</template>
<script setup >
import { computed, defineProps, ref, defineEmits } from "vue";

const emit = defineEmits(["update:modelValue"]);

const inputComponent = ref();
const props = defineProps({
    inputType: String,
    placeHolder: String,
    modelValue: String,
})


const id = Math.random().toString(36).slice(2);

const val = computed({
    get: () => props.modelValue,
    set: (val) => {
        emit('update:modelValue', val);
    },
})



</script>
