import { defineStore } from "pinia";

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
export const useTaxInfoStore = defineStore("taxinfoStore", {
  state: () => ({
    age: null,
    annualIncome: null,
    alternativeRetirementFund: null,
    govPensionFund: null,
    nationalSavingFund: null,
    pensionInsurance: null,
    riskLevel: null,
    desiredAmount: null,
  }),
  actions: {
    generatePrompt() {
      let desiredAmountWording = "";
      if (this.desiredAmount) {
        desiredAmountWording = `8. งบประมาณที่ต้องการลงทุนในกองประหยัดภาษี: ${this.desiredAmount} บาท,`;
      }
      return `1. อายุ: ${this.age} ปี,\n
            2. รายได้ประจำปี: ${this.annualIncome} บาท,\n
            3. การลงทุนใน "กองทุนสำรองเลี้ยงชีพ" หรือ "กองทุนสงเคราะห์ครู": ${
              this.alternativeRetirementFund
            } บาท,\n
            4. การลงทุนใน "กบข.": ${this.govPensionFund} บาท,\n
            5. การลงทุนใน "กองทุนการออมแห่งชาติ": ${
              this.nationalSavingFund
            } บาท,\n
            6. การลงทุนใน "ประกันบำนาญ": ${this.pensionInsurance} บาท,\n
            7. ระดับความเสี่ยงที่ต้องการ: ${this.riskLevel},
            ${desiredAmountWording}
            \nTracing ID: ${uuidv4()}
            `;
    },
    update(field: string, val: string) {
      if (field === "age") {
        this.age = val;
      } else if (field === "annualIncome") {
        this.annualIncome = val;
      } else if (field === "alternativeRetirementFund") {
        this.alternativeRetirementFund = val;
      } else if (field === "govPensionFund") {
        this.govPensionFund = val;
      } else if (field === "nationalSavingFund") {
        this.nationalSavingFund = val;
      } else if (field === "pensionInsurance") {
        this.pensionInsurance = val;
      } else if (field === "riskLevel") {
        this.riskLevel = val;
      } else if (field === "desiredAmount") {
        this.desiredAmount = val;
      }
    },
  },
});
