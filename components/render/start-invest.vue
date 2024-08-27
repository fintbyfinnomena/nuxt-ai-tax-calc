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
import { useUser } from "../../stores/UserStore"
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default {
  props: ["data"],
  data() {
    return {
      allocationPayload: [],
      taxInfoStore: null,
      AuthStore: null,
      UserStore: null,
      config: null,
    };
  },
  created() {
    this.taxInfoStore = useTaxInfoStore();
    this.AuthStore = useAuthStore();
    this.UserStore = useUser();
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
      console.log(this.allocationPayload)
      let res = await fetch(
        `charlie-web/api/charlie-service/customer/batch-order`,
        {
          method: "POST",
          header: { "Finno-User-Id": this.UserStore.user.userID },
          body: JSON.stringify({ orders: this.allocationPayload }),
        }
      );

      console.log(res)

      let data = await res.json();
      console.log(data)

      if (data.status == 200) {
        await navigateTo(``, {
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
