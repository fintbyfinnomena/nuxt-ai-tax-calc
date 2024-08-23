<template>
  <div>
    <div class="input-wrapper">
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :inputmode="inputmode"
        class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        :class="{ 'border-red-600': errorText }"
        :value="modelValue"
        @input="updateModelValue($event.target.value)"
      />
      <span class="unit">{{ unit }}</span>
    </div>
    <div
      v-if="errorText"
      class="text-xs text-error mt-1 ml-1 text-red-600 -mb-1.5"
    >
      {{ errorText }}
    </div>
  </div>
</template>

<script>
import { setMask, removeMask } from "simple-mask-money";

export default {
  name: "InputWithUnit",
  props: {
    id: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number, null],
      default: null,
    },
    unit: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    inputmode: {
      type: String,
      default: "text",
    },
    maskMoney: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inputValue: this.modelValue,
    };
  },
  methods: {
    updateModelValue(i) {
      let input = i;

      if (this.maskMoney) {
        input = input.replace(/\,/g, "");
        input = Math.round(Number(input)).toLocaleString();
      }

      this.$emit("update:modelValue", input);
    },
  },
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
