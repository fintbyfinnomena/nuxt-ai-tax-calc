<script>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../stores/AuthStore";
import { useUser } from "../../stores/UserStore";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default {
  props: ["data"],
  data() {
    return {
      AuthStore: null,
      UserStore: null,
      config: null,
    };
  },
  created() {
    this.AuthStore = useAuthStore();
    this.UserStore = useUser();
    this.config = useRuntimeConfig();
  },
  methods: {
    UnpackPayload() {
      let JsonPayload = JSON.parse(this.data);
      let fundList = JsonPayload.funds;
      let funds = [];
      fundList.forEach((fund) => {
        let amount = fund[3];
        let fundObj = {
          amount: amount,
          fund_short_code: fund[0],
        };
        funds.push(fundObj);
      });
      return funds;
    },
    async batchCheckout() {
      const funds = this.UnpackPayload();
      try {
        const response = await fetch(
          `charlie-web/api/charlie-service/customer/batch-order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orders: funds }),
          }
        );

        const res = await response.json();

        switch (res.statusCode) {
          case 200:
            const encodedData = btoa(JSON.stringify(res.data.batch_payload));
            navigateTo(
              `${this.config.public.url.batchCheckoutUrl}/review/${res.data.account_code}?q=${encodedData}`,
              { external: true }
            );
            break;

          default:
            this.handleError(res.data.error_code);
        }
      } catch (error) {
        console.error("Fetch batch-order payload error:", error);
      }
    },

    handleError(errorCode) {
      const handleErrorAction = {
        "00": () =>
          this.showToast("ไม่พบข้อมูลสมาชิกของท่าน โปรดลองใหม่อีกครั้ง"),
        "01": () =>
          navigateTo("https://port.finnomena.com/tax-saving-fund", {
            external: true,
          }),
        "02": () =>
          this.showToast(
            "ไม่สามารถเริ่มต้นลงทุนได้ เนื่องจากคุณยังไม่ได้เชื่อมต่อบัญชีธนาคาร"
          ),
      };
      const action = handleErrorAction[errorCode];
      if (action) action();
      else console.error(`Unhandled error code: ${errorCode}`);
    },
    showToast(message) {
      Toastify({
        text: message,
        duration: 3000,
        position: "center",
        style: {
          background: "#d6003d",
          padding: "20px",
        },
      }).showToast();
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
          >คุณต้องการที่จะทำรายการจัดพอร์ตกองทุนลดหย่อนภาษีใช่หรือไม่?</AlertDialogTitle
        >
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction @click="batchCheckout()">ใช่</AlertDialogAction>
        <AlertDialogCancel>ไม่ใช่</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
