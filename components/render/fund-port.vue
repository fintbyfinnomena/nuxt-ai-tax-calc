<template>
  <div class="bg-white p-5 text-primary mt-5 rounded-md">
    <h1 class="text-base font-semibold">
      การจัดพอร์ตการลงทุนในกองทุน ความเสี่ยงระดับ {{ this.riskLevel }}
    </h1>
    <div>ยอดเงินลงทุนทั้งหมด: {{ portAmount.toLocaleString() }} บาท</div>
    <br />
    <DonutChart
      index="name"
      :category="'proportion'"
      :data="data"
      :type="'pie'"
      :value-formatter="valueFormatter"
      :filterOpacity="0.7"
      :colors="this.GenColors()"
      class="h-full"
    />
    <br />
    <section>
      <section v-if="data">
        <div v-for="(type, index) in groupingFund" :key="index">
          <div class="text-base font-semibold">
            ประเภทกองทุน: {{ type.type }}
          </div>
          <div class="text-base mb-2">
            ยอดเงินลงทุน: {{ type.amount.toLocaleString() }}
          </div>

          <div
            class="flex justify-start content-center mb-5"
            v-for="(fund, indexFund) in type.funds"
            :key="indexFund"
          >
            <div
              class="w-4 h-4 rounded-full mr-3"
              :style="{ 'background-color': fund.color }"
            ></div>
            <div class="text-sm">
              <fund-click :shortcode="fund.name" />
              <div>
                แนะนำลงทุน {{ fund.proportion.toLocaleString() }}% ของ
                {{ portAmount.toLocaleString() }} =
                {{ fund.amount.toLocaleString() }} บาท
              </div>
            </div>
          </div>
        </div>
      </section>
      <div v-if="portAmount > 0">
        <start-invest :data="port" />
      </div>
    </section>
  </div>
</template>
<script>
import { DonutChart } from "@/components/ui/chart-donut";
import { usePortStore } from "../../stores/PortStore";
import { useTaxInfoStore } from "../../stores/TaxInfoStore";

export default {
  props: ["port"],
  data() {
    return {
      portJson: JSON.parse(this.port),
      riskLevel: "",
      data: [],
      valueFormatter: (tick) =>
        typeof tick === "number"
          ? `${new Intl.NumberFormat("us").format(tick).toString()} %`
          : "",
      portStore: null,
      colorArray: [],
      taxInfoStore: null,
      portAmount: 0,
    };
  },
  created() {
    this.portStore = usePortStore();
    this.taxInfoStore = useTaxInfoStore();
  },
  mounted() {
    this.riskLevel = this.portJson.risk;
    this.data = this.GenFundJSON(this.portJson.funds);

    this.colorArray = this.GenColors();
    this.groupingFund = this.GenGroupingFund(this.data);

    this.portAmount = this.data.reduce((acc, fund) => acc + fund.amount, 0);
  },
  methods: {
    GenColors() {
      let colors = [];
      let typeCount = { SSF: 0, RMF: 0, TESG: 0 };
      for (let i = 0; i < this.data.length; i++) {
        if (typeCount.SSF > 4) {
          typeCount.SSF = 0;
        }
        if (typeCount.RMF > 4) {
          typeCount.RMF = 0;
        }
        if (typeCount.TESG > 4) {
          typeCount.TESG = 0;
        }

        if (this.data[i].type === "SSF") {
          colors.push(this.portStore.color_scheme.SSF[typeCount.SSF]);
          typeCount.SSF++;
        } else if (this.data[i].type === "RMF") {
          colors.push(this.portStore.color_scheme.RMF[typeCount.RMF]);
          typeCount.RMF++;
        } else if (this.data[i].type === "TESG") {
          colors.push(this.portStore.color_scheme.TESG[typeCount.TESG]);
          typeCount.TESG++;
        }
      }
      return colors;
    },
    GenFundJSON(list) {
      let result = [];
      // Check if the element is object as the LLM might return object instead of list

      if ("fundName" in list[0]) {
        for (let elem of list) {
          result.push({
            name: elem.fundName,
            type: elem.fundType,
            proportion: elem.proportion,
            amount: elem.amount,
          });
        }
        console.log(result);
        return result;
      }

      for (let elem of list) {
        result.push({
          name: elem[0],
          type: elem[1],
          proportion: elem[2],
          amount: elem[3],
        });
      }

      return result;
    },
    GenGroupingFund(data) {
      let group = [];
      data.forEach((fund, i) => {
        fund.color = this.colorArray[i];
        if (group.length == 0) {
          group.push({
            type: fund.type,
            risk: fund.risk,
            description: fund.description,
            funds: [fund],
          });

          return;
        }

        if (group[group.length - 1].type == fund.type) {
          group[group.length - 1].funds.push(fund);
        } else {
          group.push({
            type: fund.type,
            risk: fund.risk,
            description: fund.description,
            funds: [fund],
          });
        }
      });

      for (let i = 0; i < group.length; i++) {
        group[i].amount = group[i].funds.reduce(
          (acc, fund) => acc + fund.amount,
          0
        );
      }
      return group;
    },
  },
};
</script>
<style></style>
