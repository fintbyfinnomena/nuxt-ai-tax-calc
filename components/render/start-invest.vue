<script>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTaxInfoStore } from "../../stores/TaxInfoStore";
import { useAuthStore } from "../stores/AuthStore";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default {
  props: ["data"],
  data() {
    return {
      allocationPayload: [],
      taxInfoStore: null,
      AuthStore: null,
      config: null,
    };
  },
  created() {
    this.taxInfoStore = useTaxInfoStore();
    this.AuthStore = useAuthStore();
    this.config = useRuntimeConfig();
  },
  methods: {
    UnpackPayload() {
      let JsonPayload = JSON.parse(this.data);
      let fundArray = JsonPayload.funds;
      fundArray.forEach((fund) => {
        let Percentage = parseInt(fund[2]) / 100;
        let Amount = parseInt(
          Percentage * parseInt(this.taxInfoStore.desiredAmount)
        );
        let fundObj = {
          amount: Amount,
          fund_short_code: fund[0],
        };
        this.allocationPayload.push(fundObj);
      });
      console.log(this.allocationPayload);
      Toastify({
        text: "Hello world",
        duration: 3000,
        gravity: "bottom",
        position: "center",
        style: {
          background: "#d6003d",
          padding: "20px",
        },
      }).showToast();
    },
    async Invest() {
      this.UnpackPayload();
      let res = await fetch(
        `${this.config.public.url.serviceUrl}/api/v1/customer/batch-order/`,
        {
          method: "POST",
          header: { "user-id": this.AuthStore.user_obj.uid },
          body: JSON.stringify({ order: this.allocationPayload }),
        }
      );

      let data = await res.json();
      if (data.status == 200) {
        await navigateTo("Some link", {
          external: true,
        });
      }
      if (data.error_code == "01") {
        await navigateTo("https://port.finnomena.com/tax-saving-fund", {
          external: true,
        });
      } else if (data.error_code == "02") {
        Toastify({
          text: "คุณยังไม่ได้เชื่อมต่อบัญชีธนาคาร",
          duration: 3000,
        }).showToast();
      } else if (data.error_code == "03") {
        Toastify({
          text: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
          duration: 3000,
        }).showToast();
      }
    },
  },
};
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button
        class="bg-primary text-white border border-primary rounded-lg hover:text-primary hover:bg-transparent"
        data-fn-location="chat"
        data-fn-action="allocation-invest_click"
      >
        เริ่มต้นลงทุน
        <Icon icon="iconoir:arrow-right" size="1.4em" class="ml-2" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle
          >คุณกำลังจะถูกนำทางไปหน้าซื้อกองทุนลดหย่อนภาษี</AlertDialogTitle
        >
        <AlertDialogDescription>
          โดยมีจำนวน {{ this.taxInfoStore.desiredAmount }} บาท
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
        <AlertDialogAction @click="Invest()">ตกลง</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
