<template>
    <div class="bg-gray-100 p-5 text-primary mt-5 rounded-md">
        <h1 class="text-xl font-semibold">การจัดพอร์ตการลงทุนในกองทุน ความเสี่ยงระดับ {{ this.riskLevel }}</h1>
        <br>
        <DonutChart index="name" :category="'proportion'" :data="data" :type="'pie'" :value-formatter="valueFormatter"
            :filterOpacity="0.7" :colors="this.GenColors()" class="h-full" />
        <br>
        <section>
            <section v-if="data">
                <div v-for="(fund, index) in data" :key="index">
                    <div class="flex justify-start content-center mb-5">
                        <div class="w-4 h-4 rounded-full mr-3" :style="{'background-color':colorArray[index]}"></div>
                        <div><b>{{ fund.name }}</b> แนะนำลงทุน {{ fund.proportion }}%</div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
<script>
import { DonutChart } from '@/components/ui/chart-donut'
import { usePortStore } from '../../stores/PortStore';

export default {
    props: ['port'],
    data() {
        return {
            portJson: JSON.parse(this.port),
            riskLevel: "",
            data: [],
            valueFormatter: (tick) =>
                typeof tick === 'number' ? `${new Intl.NumberFormat('us').format(tick).toString()} %` : '',
            portStore: null,
            colorArray: []
        }
    },
    created() {
        this.portStore = usePortStore()
    },
    mounted() {
        this.riskLevel = this.portJson.risk
        this.data = this.GenFundJSON(this.portJson.funds)
        this.colorArray = this.GenColors();
    },
    methods: {
        GenColors() {
            let colors = []
            let typeCount = { SSF: 0, RMF: 0, TESG: 0 }
            for (let i = 0; i < this.data.length; i++) {
                if (typeCount.SSF > 4) { typeCount.SSF = 0 }
                if (typeCount.RMF > 4) { typeCount.RMF = 0 }
                if (typeCount.TESG > 4) { typeCount.TESG = 0 }

                if (this.data[i].type === 'SSF') {
                    colors.push(this.portStore.color_scheme.SSF[typeCount.SSF])
                    typeCount.SSF++
                } else if (this.data[i].type === 'RMF') {
                    colors.push(this.portStore.color_scheme.RMF[typeCount.RMF])
                    typeCount.RMF++
                }
                else if (this.data[i].type === 'TESG') {
                    colors.push(this.portStore.color_scheme.TESG[typeCount.TESG])
                    typeCount.TESG++
                }
            }
            return colors
        },
        GenFundJSON(list) {
            let fundList = []
            list.forEach(fund => {
                let object = {
                    name: fund[0] + " (" + fund[1] + ")",
                    proportion: fund[2],
                    type: fund[1]
                }
                fundList.push(object)
            })
            return fundList
        }
    }


}
</script>
<style></style>