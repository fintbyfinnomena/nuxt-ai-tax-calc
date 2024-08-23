<template>
  <RadioGroup class="flex mt-2 flex-wrap">
    <RadioGroupItem id="r1" value="สูง" class="hidden" />
    <RadioGroupItem id="r2" value="ปานกลาง" class="hidden" />
    <RadioGroupItem id="r3" value="ต่ำ" class="hidden" />
    <RadioGroupItem id="r4" value="ต่ำมาก" class="hidden" />
    <Label for="r1">
      <div
        class="flex items-center space-x-2 rounded-2xl transition-colors py-2 w-24 border-gray-300 text-gray-700 border-solid border cursor-pointer"
        :class="{
          'bg-white': TaxInfoStore.riskLevel !== 'สูง',
          'bg-black': TaxInfoStore.riskLevel === 'สูง',
          'text-white': TaxInfoStore.riskLevel === 'สูง',
          'border-red-600': errorText,
        }"
      >
        <div class="m-auto">สูง</div>
      </div>
    </Label>
    <Label for="r2">
      <div
        class="flex items-center space-x-2 rounded-2xl transition-colors py-2 w-24 border-gray-300 text-gray-700 border-solid border cursor-pointer"
        :class="{
          'bg-white': TaxInfoStore.riskLevel !== 'ปานกลาง',
          'bg-black': TaxInfoStore.riskLevel === 'ปานกลาง',
          'text-white': TaxInfoStore.riskLevel === 'ปานกลาง',
          'border-red-600': errorText,
        }"
      >
        <div class="m-auto">ปานกลาง</div>
      </div>
    </Label>
    <Label for="r3">
      <div
        class="flex items-center space-x-2 rounded-2xl transition-colors py-2 w-24 border-gray-300 text-gray-700 border-solid border cursor-pointer"
        :class="{
          'bg-white': TaxInfoStore.riskLevel !== 'ต่ำ',
          'bg-black': TaxInfoStore.riskLevel === 'ต่ำ',
          'text-white': TaxInfoStore.riskLevel === 'ต่ำ',
          'border-red-600': errorText,
        }"
      >
        <div class="m-auto">ต่ำ</div>
      </div>
    </Label>
    <Label for="r4">
      <div
        class="flex items-center space-x-2 rounded-2xl transition-colors py-2 w-24 border-gray-300 text-gray-700 border-solid border cursor-pointer"
        :class="{
          'bg-white': TaxInfoStore.riskLevel !== 'ต่ำมาก',
          'bg-black': TaxInfoStore.riskLevel === 'ต่ำมาก',
          'text-white': TaxInfoStore.riskLevel === 'ต่ำมาก',
          'border-red-600': errorText,
        }"
      >
        <div class="m-auto">ต่ำมาก</div>
      </div>
    </Label>
    <div
      class="text-xs text-error mt-1 ml-1 text-red-600 -mb-1.5 py-1"
      v-if="errorText"
    >
      {{ errorText }}
    </div>
  </RadioGroup>
</template>

<script>
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTaxInfoStore } from "../stores/TaxInfoStore";

const radioGroup = ref(null);
export default {
  props: {
    errorText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      TaxInfoStore: null,
    };
  },
  created() {
    this.TaxInfoStore = useTaxInfoStore();
  },
};
</script>
