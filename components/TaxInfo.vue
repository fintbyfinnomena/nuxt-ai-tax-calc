<script lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { ref } from 'vue'
import InputUnit from './InputUnit.vue';
import RiskRadio from './riskRadio.vue';
import { useTaxInfoStore } from "../stores/TaxInfoStore";


export default {
    data() {
        return {
            age: ref(''),
            income: ref(''),
            backupFund: ref(''),
            pensionFund: ref(''),
            savingFund: ref(''),
            insurance: ref(''),
            risk: ref(''),
            budget: ref(''),
            TaxInfoStore: useTaxInfoStore()
        }
    },
    methods: {
        Save() {
            try {
                this.TaxInfoStore.age = parseInt(this.age)
                this.TaxInfoStore.income = parseInt(this.income)
                this.TaxInfoStore.backupFund = parseInt(this.backupFund)
                this.TaxInfoStore.savingFund = parseInt(this.savingFund)
                this.TaxInfoStore.insurance = parseInt(this.insurance)
                this.TaxInfoStore.risk = this.risk
                this.TaxInfoStore.budget = parseInt(this.budget)
            } catch (e) {
                console.error(e)
            }
        }
    }
}


</script>

<template>
    <Dialog>

        <DialogTrigger as-child>
            <Button variant="outline" class="bg-primary text-white sm:mb-10 lg:mb-0 hover:bg-primary hover:text-white">
                ระบุข้อมูลลดหย่อนภาษี
                <svg class="w-5 h-5 ml-2 -mr-1" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </Button>
        </DialogTrigger>

        <DialogContent class="sm:max-w-xl">
            <DialogHeader>
            </DialogHeader>
            <hr>
            <div class="grid grid-cols-2 gap-6">
                <div>
                    <Label for="age" class="block text-sm font-medium text-gray-700 mb-1">อายุ</Label>
                    <InputUnit type="number" unit="ปี" name="age" inputmode="numeric" v-model="age" />
                    <input type="number">
                </div>
                <div>
                    <Label for="income" class="block text-sm font-medium text-gray-700 mb-1">รายได้ต่อปี</Label>
                    <InputUnit type="number" unit="บาท" name="income" inputmode="numeric" v-model="income" />
                </div>
                <div class="col-span-2">
                    <Label for="backupFund" class="block text-sm font-medium text-gray-700 mb-1">กองทุนสำรองเลี้ยงชีพและกองทุนสงเคราะห์ครูฯ</Label>
                    <InputUnit type="number" unit="บาท" name="backupFund" inputmode="numeric" v-model="backupFund" />
                </div>
                <div class="col-span-2">
                    <Label for="pensionFund" class="block text-sm font-medium text-gray-700 mb-1">กองทุนบำเหน็จบำนาญข้าราชการ (กบข.)</Label>
                    <InputUnit type="number" unit="บาท" name="pensionFund" inputmode="numeric" v-model="pensionFund" />
                </div>
                <div class="col-span-2">
                    <Label for="savingFund" class="block text-sm font-medium text-gray-700 mb-1">กองทุนการออมแห่งชาติ</Label>
                    <InputUnit type="number" unit="บาท" name="savingFund" inputmode="numeric" v-model="savingFund" />
                </div>
                <div class="col-span-2">
                    <Label for="insurance" class="block text-sm font-medium text-gray-700 mb-1">ประกันบำนาญ</Label>
                    <InputUnit type="number" unit="บาท" name="insurance" inputmode="numeric" v-model="insurance" />
                </div>
                <div class="col-span-2">
                    <Label for="risk" class="block text-sm font-medium text-gray-700 mb-1">ความเสี่ยงที่สามารถรับได้</Label>
                    <RiskRadio name="risk" v-model="risk" />
                </div>
                <div class="col-span-2">
                    <Label for="budget" class="block text-sm font-medium text-gray-700 mb-1">งบประมาณที่ต้องการลงทุน</Label>
                    <InputUnit type="number" unit="บาท" name="buget" inputmode="numeric" v-model="budget" />
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