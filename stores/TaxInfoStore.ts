import { defineStore } from "pinia";
export const useTaxInfoStore = defineStore("taxinfoStore", {
    state: () => ({
        age: 0,
        income: 0,
        backupFund: 0,
        pensionFund:0,
        savingFund: 0,
        insurance: 0,
        risk: "",
        budget: 0,
    }),
    actions: {
        generatePrompt() {
            return ``
        },
    },
})