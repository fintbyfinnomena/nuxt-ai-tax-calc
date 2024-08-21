<template>
  <div class="bg-gray-100 p-5 text-primary mt-5 rounded-md">
    <section>
      <span
        v-if="fundTaxType == 'SSF'"
        class="bg-SSF text-primary text-md font-semibold me-2 px-2.5 py-0.5 rounded"
        >{{ this.fundTaxType }}</span
      >
      <span
        v-else-if="fundTaxType == 'RMF'"
        class="bg-RMF text-white text-base font-semibold me-2 px-2.5 py-0.5 rounded"
        >{{ this.fundTaxType }}</span
      >
      <span
        v-else-if="fundTaxType == 'TESG'"
        class="bg-TESG text-primary text-base font-medium me-2 px-2.5 py-0.5 rounded"
        >{{ this.fundTaxType }}</span
      >
      <span
        v-if="isFinnnoPick"
        class="bg-primary text-white text-md font-medium me-2 px-2.5 py-0.5 rounded"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="display: inline; margin-right: 2px"
        >
          <path
            d="M10.4356 0.333252V2.11103H0.666626V6.55547H11.3237V0.333252H10.4356Z"
            fill="#F2F93C"
          />
          <path
            d="M0.666626 7.44434V13.6666H1.55472V11.8888H5.99518V7.44434H0.666626Z"
            fill="#F2F93C"
          />
        </svg>
        <span style="display: inline">PICK</span>
      </span>
      <span
        v-if="isEligibleForFintCashback && isEligibleForFintEarn"
        class="bg-FINT text-primary text-base font-semibold me-2 px-2.5 py-0.5 rounded"
      >
        <img class="w-5 h-5 rounded-full inline-block mr-1" src="../../assets/img/fint.png">
        Earn / Cashback
      </span>
      <span
        v-else-if="isEligibleForFintCashback && !isEligibleForFintEarn"
        class="bg-FINT text-primary text-base font-semibold me-2 px-2.5 py-0.5 rounded"
        >
        <img class="w-5 h-5 rounded-full inline" src="../../assets/img/fint.png">
        Cashback
      </span>
      <span
        v-else-if="isEligibleForFintEarn && !isEligibleForFintCashback"
        class="bg-FINT text-primary text-base font-semibold me-2 px-2.5 py-0.5 rounded"
        >
        <img class="w-5 h-5 rounded-full inline" src="../../assets/img/fint.png">
        Earn
      </span>
    </section>
    <section class="mb-3 mt-4">
      <h2 class="text-2xl font-semibold">{{ this.Code }}</h2>
      <p>{{ this.name }}</p>
      <p class="text-sm">{{ this.category }} | {{ this.riskSpectrum }}</p>
    </section>
    <a
      :href="factsheet"
      class="text-sm font-semibold text-primary underline"
      target="_blank"
      data-fn-location="chat"
      data-fn-action="fund-info-prospectus_click"
      :data-fn-params="`{
        'fund' : '${this.Code}'
        }`"
    >
      <Icon icon="iconoir:page" size="1.4em" class="mr-1"/>หนังสือชี้ชวน
    </a>
    <section class="bg-white my-3 py-3 rounded-lg mb-5 mt-5">
      <div class="grid grid-cols-1 md:grid-cols-4">
        <div class="text-center align-middle border-b md:border-b-0">
          ผลตอบแทน
        </div>
        <div class="text-center align-middle">
          <p
            :style="{
              color:
                three_month === '-'
                  ? 'gray'
                  : three_month > 0
                  ? '#00853E'
                  : '#E60A0A',
            }"
          >
            {{ isNumber(three_month) ? three_month.toFixed(2) : three_month }}%
          </p>
          <p>3M</p>
        </div>
        <div
          class="text-center border-t md:border-l md:border-t-0 align-middle"
        >
          <p
            :style="{
              color:
                six_month === '-'
                  ? 'gray'
                  : six_month > 0
                  ? '#00853E'
                  : '#E60A0A',
            }"
          >
            {{ isNumber(six_month) ? six_month.toFixed(2) : six_month }}%
          </p>
          <p>6M</p>
        </div>
        <div
          class="text-center border-t md:border-l md:border-t-0 align-middle"
        >
          <p
            :style="{
              color:
                one_year === '-'
                  ? 'gray'
                  : one_year > 0
                  ? '#00853E'
                  : '#E60A0A',
            }"
          >
            {{ isNumber(one_year) ? one_year.toFixed(2) : one_year }}%
          </p>
          <p>1Y</p>
        </div>
      </div>
    </section>

    <a
      :href="link"
      class="text-sm px-3 py-1 rounded-full font-semibold bg-transparent text-primary border border-primary hover:text-white hover:bg-primary"
      target="_blank"
      data-fn-location="chat"
      data-fn-action="fund-info-quote_click"
      :data-fn-params="`{
        'fund' : '${this.Code}'
        }`"
    >
      ดูข้อมูล {{ this.Code }}
      <Icon icon="iconoir:arrow-right" size="1.4em" />
    </a>
  </div>
</template>
<script>
// import { useMessageStore } from "../stores/MessageStore";

export default {
  props: ["shortcode"],
  data() {
    return {
      // MessageStore: null,
      config: null,
      Code: "",
      name: "",
      category: "",
      fundTaxType: "",
      isFinnnoPick: "",
      isEligibleForFintCashback: "",
      isEligibleForFintEarn: "",
      riskSpectrum: "",
      link: "",
      factsheet: "",
      three_month: "",
      six_month: "",
      one_year: "",
    };
  },
  created() {
    this.config = useRuntimeConfig();
    this.MessageStore = useMessageStore();
  },
  mounted() {
    let fundInfo = this.GetFundData();
  },
  methods: {
    isNumber(n) {
      return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    },
    async GetFundData() {
      let encodedShortcode = encodeURIComponent(this.shortcode);

      let res = await fetch(
        `${this.config.public.url.serviceUrl}/api/v1/fund/fund-info/${encodedShortcode}`
      );
      let data = await res.json();
      this.Code = data.data.info.shortCode;
      this.name = data.data.info.nameTh;
      this.category = data.data.info.categoryThName;
      this.fundTaxType = data.data.info.fundTaxType;
      this.isFinnnoPick = data.data.info.isFinnnoPick;
      this.isEligibleForFintCashback = data.data.info.isEligibleForFintCashback;
      this.isEligibleForFintEarn = data.data.info.isEligibleForFintEarn;
      this.riskSpectrum = data.data.info.riskSpectrum;
      this.link = data.data.fundQuoteLink;
      this.factsheet = data.data.info.fundFactSheetUrl;
      this.three_month = data.data.performance.return3m || "-";
      this.six_month = data.data.performance.return6m || "-";
      this.one_year = data.data.performance.return1y || "-";

      // this.MessageStore.Rendered = true;
    },
  },
};
</script>
<style></style>
