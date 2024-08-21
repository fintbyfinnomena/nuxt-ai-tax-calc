<script>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ref } from "vue";
import InputUnit from "./InputUnit.vue";
import RiskRadio from "./riskRadio.vue";
import { useTaxInfoStore } from "../stores/TaxInfoStore";
import { useMessageStore } from "../stores/MessageStore";

export default {
  props: ["location"],
  data() {
    return {
      nuxtApp: useNuxtApp(),
      MessageStore: null,
      TaxInfoStore: null,
    };
  },
  created() {
    this.TaxInfoStore = useTaxInfoStore();
    this.MessageStore = useMessageStore();
  },
  methods: {
    Save() {
      try {
        this.MessageStore.autoMsg = this.TaxInfoStore.generatePrompt();
        this.nuxtApp.$tagEvent(
          "allocation-param_submit",
          "allocation-param-modal",
          this.TaxInfoStore
        );
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        variant="outline"
        class="bg-primary text-white lg:mb-0 rounded-full border border-primary hover:text-primary hover:bg-transparent"
        :data-fn-location="location"
        data-fn-action="allocation-param-modal_open"
      >
        <Icon icon="iconoir:page-edit" size="1.4em" class="mr-2" />
        ระบุข้อมูลลดหย่อนภาษี
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-xl">
      <DialogHeader> </DialogHeader>
      <hr />
      <div class="grid grid-cols-2 gap-6">
        <div>
          <Label for="age" class="block text-sm font-medium text-gray-700 mb-1"
            >อายุ</Label
          >
          <InputUnit
            type="text"
            unit="ปี"
            name="age"
            inputmode="numeric"
            v-model="TaxInfoStore.age"
          />
        </div>
        <div>
          <Label
            for="annualIncome"
            class="block text-sm font-medium text-gray-700 mb-1"
            >รายได้ต่อปี</Label
          >
          <InputUnit
            type="text"
            unit="บาท"
            name="annualIncome"
            inputmode="numeric"
            v-model="TaxInfoStore.annualIncome"
            v-commas-seperate
          />
        </div>
        <div class="col-span-2">
          <Label
            for="alternativeRetirementFund"
            class="block text-sm font-medium text-gray-700 mb-1"
            >กองทุนสำรองเลี้ยงชีพและกองทุนสงเคราะห์ครูฯ</Label
          >
          <InputUnit
            type="text"
            unit="บาท"
            name="alternativeRetirementFund"
            inputmode="numeric"
            v-model="TaxInfoStore.alternativeRetirementFund"
            v-commas-seperate
          />
        </div>
        <div class="col-span-2">
          <Label
            for="govPensionFund"
            class="block text-sm font-medium text-gray-700 mb-1"
            >กองทุนบำเหน็จบำนาญข้าราชการ (กบข.)</Label
          >
          <InputUnit
            type="text"
            unit="บาท"
            name="govPensionFund"
            inputmode="numeric"
            v-model="TaxInfoStore.govPensionFund"
            v-commas-seperate
          />
        </div>
        <div class="col-span-2">
          <Label
            for="nationalSavingFund"
            class="block text-sm font-medium text-gray-700 mb-1"
            >กองทุนการออมแห่งชาติ</Label
          >
          <InputUnit
            type="text"
            unit="บาท"
            name="nationalSavingFund"
            inputmode="numeric"
            v-model="TaxInfoStore.nationalSavingFund"
            v-commas-seperate
          />
        </div>
        <div class="col-span-2">
          <Label
            for="pensionInsurance"
            class="block text-sm font-medium text-gray-700 mb-1"
            >ประกันบำนาญ</Label
          >
          <InputUnit
            type="text"
            unit="บาท"
            name="pensionInsurance"
            inputmode="numeric"
            v-model="TaxInfoStore.pensionInsurance"
            v-commas-seperate
          />
        </div>
        <div class="col-span-2">
          <Label
            for="riskLevel"
            class="block text-sm font-medium text-gray-700 mb-1"
            >ความเสี่ยงที่สามารถรับได้</Label
          >
          <RiskRadio name="riskLevel" v-model="TaxInfoStore.riskLevel" />
        </div>
        <div class="col-span-2">
          <Label
            for="desiredAmount"
            class="block text-sm font-medium text-gray-700 mb-1"
            >งบประมาณที่ต้องการลงทุน หรือ ลงทุนเพิ่ม</Label
          >
          <InputUnit
            type="text"
            unit="บาท"
            name="desiredAmount"
            inputmode="numeric"
            v-model="TaxInfoStore.desiredAmount"
            v-commas-seperate
          />
        </div>
      </div>

      <DialogFooter class="sm:justify-center">
        <DialogClose as-child>
          <Button type="button" class="bg-primary" @click="Save()">
            <p>บันทึกข้อมูล</p>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
