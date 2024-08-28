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
} from "@/components/ui/dialog";

import { ref } from "vue";
import InputUnit from "./InputUnit.vue";
import RiskRadio from "./riskRadio.vue";
import { useTaxInfoStore } from "../stores/TaxInfoStore";
import { useMessageStore } from "../stores/MessageStore";

function isNumber(value) {
  return typeof value === "number";
}

function stripCommasAndCheckNumber(value) {
  if (isNumber(value)) {
    return true;
  }

  try {
    const parsedFloat = parseFloat(value.replace(/,/g, ""));
    if (isNaN(parsedFloat)) {
      return false;
    }

    return typeof parsedFloat === "number";
  } catch (e) {
    return false;
  }
}

function stripCommaAndConvertNumber(value) {
  if (isNumber(value)) {
    return value;
  }
  return parseInt(value.replace(/,/g, ""));
}

export default {
  data() {
    return {
      nuxtApp: useNuxtApp(),
      MessageStore: null,
      TaxInfoStore: null,
      hasDesiredAmount: false,
      hasAlternativeRetirementFund: false,
      hasGovPensionFund: false,
      hasNationalSavingFund: false,
      hasPensionInsurance: false,

      errorAge: "",
      errorAnnualIncome: "",
      errorRisk: "",
      errorDesiredAmount: "",
      errorAlternativeRetirementFund: "",
      errorGovPensionFund: "",
      errorNationalSavingFund: "",
      errorPensionInsurance: "",
    };
  },
  created() {
    this.TaxInfoStore = useTaxInfoStore();
    this.MessageStore = useMessageStore();
  },
  methods: {
    Save() {
      try {
        let isError = false;
        if (
          !stripCommasAndCheckNumber(this.TaxInfoStore.age) ||
          !this.TaxInfoStore.age ||
          this.TaxInfoStore.age < 1 ||
          this.TaxInfoStore.age > 99
        ) {
          this.errorAge = "โปรดระบุอายุของคุณ";
          isError = true;
        } else {
          this.errorAge = "";
        }

        if (
          !stripCommasAndCheckNumber(this.TaxInfoStore.annualIncome) ||
          !this.TaxInfoStore.annualIncome ||
          this.TaxInfoStore.annualIncome < 0 ||
          stripCommaAndConvertNumber(this.TaxInfoStore.annualIncome) > 999999999
        ) {
          this.errorAnnualIncome = "โปรดระบุรายได้ของคุณ";
          isError = true;
        } else {
          this.errorAnnualIncome = "";
        }

        if (!this.TaxInfoStore.riskLevel) {
          this.errorRisk = "โปรดระบุความเสี่ยงที่สามารถรับได้ของคุณ";
          isError = true;
        } else {
          this.errorRisk = "";
        }

        if (
          this.hasDesiredAmount &&
          (!stripCommasAndCheckNumber(this.TaxInfoStore.desiredAmount) ||
            this.TaxInfoStore.desiredAmount < 0 ||
            stripCommaAndConvertNumber(this.TaxInfoStore.desiredAmount) >
              999999999)
        ) {
          this.errorDesiredAmount = "โปรดระบุงบประมาณที่ต้องการลงทุน";
          isError = true;
        } else {
          this.errorDesiredAmount = "";
        }

        if (
          this.hasAlternativeRetirementFund &&
          (!stripCommasAndCheckNumber(
            this.TaxInfoStore.alternativeRetirementFund
          ) ||
            this.TaxInfoStore.alternativeRetirementFund < 0 ||
            stripCommaAndConvertNumber(
              this.TaxInfoStore.alternativeRetirementFund
            ) > 999999999)
        ) {
          this.errorAlternativeRetirementFund = "โปรดระบุจำนวนเงินที่คุณลงทุน";
          isError = true;
        } else {
          this.errorAlternativeRetirementFund = "";
        }

        if (
          this.hasGovPensionFund &&
          (!stripCommasAndCheckNumber(this.TaxInfoStore.govPensionFund) ||
            this.TaxInfoStore.govPensionFund < 0 ||
            stripCommaAndConvertNumber(this.TaxInfoStore.govPensionFund) >
              999999999)
        ) {
          this.errorGovPensionFund = "โปรดระบุจำนวนเงินที่คุณลงทุน";
          isError = true;
        } else {
          this.errorGovPensionFund = "";
        }

        if (
          this.hasNationalSavingFund &&
          (!stripCommasAndCheckNumber(this.TaxInfoStore.nationalSavingFund) ||
            this.TaxInfoStore.nationalSavingFund < 0 ||
            stripCommaAndConvertNumber(this.TaxInfoStore.nationalSavingFund) >
              999999999)
        ) {
          this.errorNationalSavingFund = "โปรดระบุจำนวนเงินที่คุณลงทุน";
          isError = true;
        } else {
          this.errorNationalSavingFund = "";
        }

        if (
          this.hasPensionInsurance &&
          (!stripCommasAndCheckNumber(this.TaxInfoStore.pensionInsurance) ||
            this.TaxInfoStore.pensionInsurance < 0 ||
            stripCommaAndConvertNumber(this.TaxInfoStore.pensionInsurance) >
              999999999)
        ) {
          this.errorPensionInsurance = "โปรดระบุจำนวนเงินที่คุณลงทุน";
          isError = true;
        } else {
          this.errorPensionInsurance = "";
        }

        if (isError) {
          return;
        }

        // Format data
        if (!this.hasDesiredAmount) {
          this.TaxInfoStore.desiredAmount = 0;
        }

        if (!this.hasAlternativeRetirementFund) {
          this.TaxInfoStore.alternativeRetirementFund = 0;
        }

        if (!this.hasGovPensionFund) {
          this.TaxInfoStore.govPensionFund = 0;
        }

        if (!this.hasNationalSavingFund) {
          this.TaxInfoStore.nationalSavingFund = 0;
        }

        if (!this.hasPensionInsurance) {
          this.TaxInfoStore.pensionInsurance = 0;
        }

        this.MessageStore.autoMsg = this.TaxInfoStore.generatePrompt();
        this.nuxtApp.$tagEvent(
          "allocation-param_submit",
          "allocation-param-modal",
          {
            age: this.TaxInfoStore.age,
            annualIncome: this.TaxInfoStore.annualIncome,
            alternativeRetirementFund:
              this.TaxInfoStore.alternativeRetirementFund,
            govPensionFund: this.TaxInfoStore.govPensionFund,
            nationalSavingFund: this.TaxInfoStore.nationalSavingFund,
            pensionInsurance: this.TaxInfoStore.pensionInsurance,
            riskLevel: this.TaxInfoStore.riskLevel,
            desiredAmount: this.TaxInfoStore.desiredAmount,
          }
        );

        this.MessageStore.modal = false;
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    canAddTaxBenefitOption() {
      return !(
        this.hasAlternativeRetirementFund &&
        this.hasGovPensionFund &&
        this.hasNationalSavingFund &&
        this.hasPensionInsurance
      );
    },
  },
};
</script>

<template>
  <Dialog>
    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <div class="text-sm font-semibold">
          <Icon icon="iconoir:page-edit" /> ข้อมูลลดหย่อนภาษี
        </div>
      </DialogHeader>
      <hr />
      <div class="grid grid-cols-2 gap-6">
        <div class="col-span-2 sm:col-span-1">
          <Label
            for="age"
            class="block text-sm font-semibold text-gray-700 mb-1"
            >อายุ*</Label
          >
          <InputUnit
            type="number"
            id="age"
            unit="ปี"
            name="age"
            inputmode="numeric"
            v-model="TaxInfoStore.age"
            :errorText="errorAge"
          />
        </div>
        <div class="col-span-2 sm:col-span-1 -mt-3 sm:mt-0">
          <Label
            for="annualIncome"
            class="block text-sm font-semibold text-gray-700 mb-1"
            >รายได้ต่อปี*</Label
          >
          <InputUnit
            type="text"
            unit="บาท"
            name="annualIncome"
            id="annualIncome"
            inputmode="numeric"
            v-model="TaxInfoStore.annualIncome"
            placeholder="โปรดระบุจำนวน"
            :mask-money="true"
            :errorText="errorAnnualIncome"
          />
        </div>
        <div class="col-span-2">
          <Label
            for="riskLevel"
            class="block text-sm font-semibold text-gray-700 mb-1"
            >ความเสี่ยงที่สามารถรับได้*
            <div class="has-tooltip inline">
              <span
                class="tooltip rounded shadow-lg p-1 bg-gray-100 mt-5 -ml-16 max-w-72 py-5 px-4 font-medium"
                >คุณเต็มใจที่จะลงทุนในกลุ่มการลงทุนใดมากที่สุด
                <ul class="list-disc list-outside text-sm pl-7 mt-1">
                  <li>
                    <b>เสี่ยงสูง</b> - หวังกำไรถึง 20%
                    แต่ถ้าโชคไม่ดีขาดทุนก็ยอมได้ 10% ขึ้นไป
                  </li>
                  <li>
                    <b>เสี่ยงปานกลาง</b> - หวังกำไรถึง 10%
                    แต่ถ้าโชคไม่ดีขาดทุนก็ยอมได้สัก 5%
                  </li>
                  <li>
                    <b>เสี่ยงต่ำ</b> - ผลตอบแทนค่อนๆโต 5% แต่อาจขาดทุนได้บ้าง
                    1-2%
                  </li>
                  <li>
                    <b>เสี่ยงต่ำมาก</b> - ผลตอบแทนแน่นอน 1-2.5% โดยไม่ขาดทุนเลย
                  </li>
                </ul>
              </span>
              <Icon
                icon="fa:question-circle"
                class="ml-1 text-gray-400 -mt-1.5"
              />
            </div>
          </Label>
          <RiskRadio
            name="riskLevel"
            v-model="TaxInfoStore.riskLevel"
            :errorText="errorRisk"
          />
        </div>
        <div class="col-span-2">
          <Label
            for="desiredAmount"
            class="block text-sm font-semibold text-gray-700 mb-1"
            >งบประมาณที่ต้องการลงทุน หรือ ลงทุนเพิ่ม</Label
          >
          <RadioGroup
            class="flex text-gray-700 mt-2"
            v-model="hasDesiredAmount"
          >
            <RadioGroupItem id="da1" :value="true" class="" />
            <Label for="da1" class="text-sm">มีงบประมาณที่คิดไว้</Label>
            <RadioGroupItem id="da2" :value="false" />
            <Label for="da2" class="text-sm">ไม่มีงบประมาณที่คิดไว้</Label>
          </RadioGroup>
          <InputUnit
            v-if="hasDesiredAmount"
            type="text"
            unit="บาท"
            name="desiredAmount"
            id="desiredAmount"
            inputmode="numeric"
            class="mt-1"
            v-model="TaxInfoStore.desiredAmount"
            placeholder="โปรดระบุจำนวน"
            :mask-money="true"
            :errorText="errorDesiredAmount"
          />
        </div>
        <div class="col-span-2" v-if="hasAlternativeRetirementFund">
          <div class="flex justify-between">
            <Label
              for="alternativeRetirementFund"
              class="block text-sm font-semibold text-gray-700 mb-1"
              >กองทุนสำรองเลี้ยงชีพและกองทุนสงเคราะห์ครูฯ</Label
            >
            <Icon
              icon="fa:times-circle"
              class="text-red-500 cursor-pointer"
              @click="hasAlternativeRetirementFund = false"
              size="0.8rem"
            />
          </div>
          <InputUnit
            type="text"
            unit="บาท"
            name="alternativeRetirementFund"
            id="alternativeRetirementFund"
            inputmode="numeric"
            v-model="TaxInfoStore.alternativeRetirementFund"
            placeholder="โปรดระบุจำนวน"
            :mask-money="true"
            :errorText="errorAlternativeRetirementFund"
          />
        </div>
        <div class="col-span-2" v-if="hasGovPensionFund">
          <div class="flex justify-between">
            <Label
              for="govPensionFund"
              class="block text-sm font-semibold text-gray-700 mb-1"
              >กองทุนบำเหน็จบำนาญข้าราชการ (กบข.)</Label
            >
            <Icon
              icon="fa:times-circle"
              class="text-red-500 cursor-pointer"
              @click="hasGovPensionFund = false"
              size="0.8rem"
            />
          </div>
          <InputUnit
            type="text"
            unit="บาท"
            name="govPensionFund"
            id="govPensionFund"
            inputmode="numeric"
            v-model="TaxInfoStore.govPensionFund"
            placeholder="โปรดระบุจำนวน"
            :mask-money="true"
            :errorText="errorGovPensionFund"
          />
        </div>
        <div class="col-span-2" v-if="hasNationalSavingFund">
          <div class="flex justify-between">
            <Label
              for="nationalSavingFund"
              class="block text-sm font-semibold text-gray-700 mb-1"
              >กองทุนการออมแห่งชาติ</Label
            >
            <Icon
              icon="fa:times-circle"
              class="text-red-500 cursor-pointer"
              @click="hasNationalSavingFund = false"
              size="0.8rem"
            />
          </div>
          <InputUnit
            type="text"
            unit="บาท"
            name="nationalSavingFund"
            id="nationalSavingFund"
            inputmode="numeric"
            v-model="TaxInfoStore.nationalSavingFund"
            placeholder="โปรดระบุจำนวน"
            :mask-money="true"
            :errorText="errorNationalSavingFund"
          />
        </div>
        <div class="col-span-2" v-if="hasPensionInsurance">
          <div class="flex justify-between">
            <Label
              for="pensionInsurance"
              class="block text-sm font-semibold text-gray-700 mb-1"
              >ประกันบำนาญ</Label
            >
            <Icon
              icon="fa:times-circle"
              class="text-red-500 cursor-pointer"
              size="0.8rem"
              @click="hasPensionInsurance = false"
            />
          </div>
          <InputUnit
            type="text"
            unit="บาท"
            name="pensionInsurance"
            id="pensionInsurance"
            inputmode="numeric"
            v-model="TaxInfoStore.pensionInsurance"
            placeholder="โปรดระบุจำนวน"
            :mask-money="true"
            :errorText="errorPensionInsurance"
          />
        </div>
        <div class="col-span-2" v-if="canAddTaxBenefitOption">
          <div class="block text-sm font-semibold text-gray-700 mb-1">
            เพิ่มสิทธิ์ลดหย่อน
          </div>
          <div class="flex flex-wrap gap-2 text-sm">
            <div
              class="bg-gray-100 cursor-pointer px-3 py-1 rounded"
              @click="hasAlternativeRetirementFund = true"
              v-if="!hasAlternativeRetirementFund"
            >
              กองทุนสำรองเลี้ยงชีพและกองทุนสงเคราะห์ครูฯ
              <Icon icon="iconoir:plus" size="1.2rem" class="align-sub" />
            </div>
            <div
              class="bg-gray-100 cursor-pointer px-3 py-1 rounded"
              @click="hasGovPensionFund = true"
              v-if="!hasGovPensionFund"
            >
              กบข. <Icon icon="iconoir:plus" size="1.2rem" class="align-sub" />
            </div>

            <div
              class="bg-gray-100 cursor-pointer px-3 py-1 rounded"
              @click="hasNationalSavingFund = true"
              v-if="!hasNationalSavingFund"
            >
              กองทุนการออมแห่งชาติ
              <Icon icon="iconoir:plus" size="1.2rem" class="align-sub" />
            </div>

            <div
              class="bg-gray-100 cursor-pointer px-3 py-1 rounded"
              @click="hasPensionInsurance = true"
              v-if="!hasPensionInsurance"
            >
              ประกันบำนาญ
              <Icon icon="iconoir:plus" size="1.2rem" class="align-sub" />
            </div>
          </div>
        </div>
      </div>

      <DialogFooter class="mt-2">
        <DialogClose as-child class="ml-auto">
          <Button
            type="button"
            class="bg-secondary text-gray-700 hover:text-gray-100"
          >
            <p>ยกเลิก</p>
          </Button>
        </DialogClose>

        <Button type="button" class="bg-primary" @click="Save()">
          <p>บันทึกข้อมูล</p>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.tooltip {
  @apply invisible absolute;
}

.has-tooltip:hover .tooltip {
  @apply visible z-50;
}
</style>
