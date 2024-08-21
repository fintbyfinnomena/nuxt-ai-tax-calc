import { defineStore } from "pinia";
export const useTaxInfoStore = defineStore("taxinfoStore", {
  state: () => ({
    age: "0",
    annualIncome: "0",
    alternativeRetirementFund: "0",
    govPensionFund: "0",
    nationalSavingFund: "0",
    pensionInsurance: "0",
    riskLevel: "",
    desiredAmount: "0",
  }),
  actions: {
    generatePrompt() {
      return `1. อายุ: ${this.age},\n
            2. รายได้ประจำปี: ${this.annualIncome} บาท,\n
            3. การลงทุนใน "กองทุนสำรองเลี้ยงชีพ" หรือ "กองทุนสงเคราะห์ครู": ${this.alternativeRetirementFund} บาท,\n
            4. การลงทุนใน "กบข.": ${this.govPensionFund} บาท,\n
            5. การลงทุนใน "กองทุนการออมแห่งชาติ": ${this.nationalSavingFund} บาท,\n
            6. การลงทุนใน "ประกันบำนาญ": ${this.pensionInsurance} บาท,\n
            7. ระดับความเสี่ยงที่ต้องการ: ${this.riskLevel},\n
            8. จำนวนเงินที่ต้องการลงทุนในกองทุนประหยัดภาษี: ${this.desiredAmount} บาท`;
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
