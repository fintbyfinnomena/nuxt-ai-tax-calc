import { defineStore } from "pinia";
export const useTaxInfoStore = defineStore("taxinfoStore", {
    state: () => ({
        age: "0",
        income: "0",
        backupFund: "0",
        pensionFund: "0",
        savingFund: "0",
        insurance: "0",
        risk: "",
        budget: "0",
    }),
    actions: {
        generatePrompt() {
            return `1. อายุ: ${this.age},\n
            2. รายได้ประจำปี: ${this.income} บาท,\n
            3. การลงทุนใน "กองทุนสำรองเลี้ยงชีพ" หรือ "กองทุนสงเคราะห์ครู": ${this.backupFund} บาท,\n
            4. การลงทุนใน "กบข.": ${this.pensionFund} บาท,\n
            5. การลงทุนใน "กองทุนการออมแห่งชาติ": ${this.savingFund} บาท,\n
            6. การลงทุนใน "ประกันบำนาญ": ${this.insurance} บาท,\n
            7. ระดับความเสี่ยงที่ต้องการ: ${this.risk},\n
            8. จำนวนเงินที่ต้องการลงทุนในกองทุนประหยัดภาษี: ${this.budget} บาท`
        },
        update(field: string,val: string) {
            if (field === "age") {
                this.age = val
            } else if (field === "income") {
                this.income = val
            } else if (field === "backupFund") {            
                this.backupFund = val
            } else if (field === "pensionFund") {
                this.pensionFund = val
            } else if (field === "savingFund") {
                this.savingFund = val
            } else if (field === "insurance") {
                this.insurance = val
            } else if (field === "risk") {
                this.risk = val
            } else if (field === "budget") {
                this.budget = val
            }
        }
    },
})