<template>
    <div class="input-wrapper">
        <input :type="type" :placeholder="placeholder" v-model="inputValue" :inputmode="inputmode"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            @input="$emit('update:modelValue', inputValue)" />
        <span class="unit">{{ unit }}</span>
    </div>
</template>

<script>
export default {
    name: 'InputWithUnit',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        unit: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        inputmode: {
            type: String,
            default: 'text'
        }
    },
    data() {
        return {
            inputValue: this.modelValue
        };
    },
    watch: {
        modelValue(newVal) {
            this.inputValue = newVal;
        }
    }
};
</script>

<style scoped>
.input-wrapper {
    position: relative;
    display: block;
}

.unit {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    /* Ensures the unit text does not interfere with input interactions */
}
</style>