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
  props: ["port"],
  data() {
    return {
      AuthStore: null,
      UserStore: null,
      config: null,
      errorType: null,

      noTsf: "noTsf",
      noMutualFundAcc: "noMutualFundAcc",
      noBankAcc: "noBankAcc",
      unknownError: "unknownError",
    };
  },
  created() {
    this.AuthStore = useAuthStore();
    this.UserStore = useUser();
    this.config = useRuntimeConfig();
    this.parsedFund = this.UnpackPayload(this.port);
  },
  methods: {
    UnpackPayload(fundProp) {
      let fundList = fundProp;
      let funds = [];
      fundList.forEach((fund) => {
        let amount = fund.amount;
        let fundObj = {
          amount: amount,
          fund_short_code: fund.name,
        };
        funds.push(fundObj);
      });
      return funds;
    },
    async batchCheckout() {
      const funds = this.parsedFund;
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
        this.handleError(unknownError);
        console.error("Fetch batch-order payload error:", error);
      }
    },

    handleError(errorCode) {
      switch (errorCode) {
        case "00":
          this.errorType = this.noMutualFundAcc;
          break;
        case "01":
          this.errorType = this.noTsf;
          break;
        case "02":
          this.errorType = this.noBankAcc;
          break;
        default:
          this.errorType = this.unknownError;
          console.error(`Unhandled error code: ${errorCode}`);
          break;
      }
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
    clearError() {
      this.errorType = null;
    },
  },
};
</script>

<template>
  <div>
    <AlertDialog>
      <AlertDialogTrigger as-child>
        <Button
          class="bg-primary text-white border border-primary rounded-lg hover:text-primary hover:bg-transparent"
          data-fn-location="chat"
          data-fn-action="allocation-invest_click"
          @click="clearError"
        >
          เริ่มต้นลงทุน
          <Icon icon="iconoir:arrow-right" size="1.4em" class="ml-2" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle class="font-normal"
            ><b>ลงทุนกองทุนประหยัดภาษีแนะนำ</b>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div v-if="errorType == null">
          <table class="bg-gray-200 w-full">
            <thead>
              <tr>
                <th class="text-left p-2">กองทุน</th>
                <th class="text-right p-2">จำนวนเงิน</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(fund, index) in parsedFund" :key="index">
                <td class="p-2">{{ fund.fund_short_code }}</td>
                <td class="text-right p-2">
                  {{ fund.amount.toLocaleString() }} บาท
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mt-1">
            กรุณาตรวจสอบรายการกองทุนและจำนวนเงินอีกครั้งก่อนทำรายการ
          </div>
          <div class="text-xs mt-3">
            เนื่องจากระบบยังอยู่ในช่วงทดสอบ อาจจะให้ข้อมูลที่ผิดพลาดได้
            ในการลงทุนจริงหลังจากใช้งานนักลงทุนควรตรวจสอบข้อมูลให้ละเอียดอีกครั้ง
            |
            กองทุนแนะนำและคำแนะนำในการจัดพอร์ตกองทุนประหยัดภาษีทั้งหมดเป็นคำแนะนำแบบทั่วไปจากบลน.ฟินโนมีนาจำกัด
            ระบบ Charlie เพียงแค่นำข้อมูลจากผู้ลงทุนเพื่อใช้ในการคำนวณเท่านั้น |
            ผู้ลงทุนควรศึกษาข้อมูลเกี่ยวกับสิทธิประโยชน์ทางภาษีที่ระบุไว้ในคู่มือการลงทุนในกองทุนรวมเพื่อสิทธิ์ประโยชน์ทางภาษีก่อนตัดสินใจลงทุน
          </div>
        </div>
        <div v-else>
          <div v-if="errorType == noMutualFundAcc">
            คุณยังไม่มีบัญชีสำหรับลงทุนกองทุนกับทาง Finnomena

            <div class="mt-3">
              <b>เปิดบัญชีกับเราดีอย่างไร ?</b>
              <img
                class="w-full max-w-[300px] mt-2 mr-auto ml-auto"
                src="https://scontent.finnomena.com/port-web/images/landing-page/device.png"
              />
              <ul class="list-disc list-outside pl-6">
                <li>
                  ครอบคลุมผลิตภัณฑ์กองทุนรวมที่หลากหลาย
                  เราให้บริการทั้งการลงทุนรายกองทุนผ่าน 21 บลจ.
                </li>
                <li>
                  เป็นกลางไร้สังกัดค่าย
                  สามารถจัดสัดส่วนการลงทุนได้อย่างดีเยี่ยมโดยไม่อิงที่ใดที่หนึ่ง
                  เพื่อคัดสรรกองทุนให้ได้มาซึ่งผลลัพธ์ที่ดีที่สุดแก่นักลงทุน
                </li>
                <li>
                  บริการที่ปรึกษาการลงทุนส่วนตัว FINNOMENA X
                  สำหรับนักลงทุนที่มียอดเงินลงทุนเริ่มต้นตั้งแต่ 5 แสนบาท
                  ขึ้นไปที่ให้คำแนะนำและแจ้งเตือนผลลัพธ์การลงทุนให้กับคุณอย่างใกล้ชิด
                  ผ่านทางแอพพลิเคชันและทางโทรศัพท์
                </li>
                <li>
                  รับการแจ้งเตือนการปรับพอร์ตการลงทุนทันที
                  เมื่อมีการเปลี่ยนมุมมองการลงทุน
                </li>
              </ul>
            </div>

            <div class="mt-2 mb-2 bg-gray-100 px-2 py-3">
              ดาว์นโหลดแอปพลิเคชัน Finnomena ได้ที่
              <a
                class="underline"
                href="https://apps.apple.com/th/app/finnomena-%E0%B8%81%E0%B8%AD%E0%B8%87%E0%B8%97-%E0%B8%99%E0%B8%A3%E0%B8%A7%E0%B8%A1-%E0%B8%AB-%E0%B8%99%E0%B8%81/id1182358897?l=th"
                target="_blank"
                >App Store</a
              >
              และ
              <a
                class="underline"
                href="https://play.google.com/store/apps/details?id=com.finnomena.finnomena&hl=en&gl=US"
                target="_blank"
                >Playstore</a
              >
            </div>

            <div class="text-sm mt-4">
              * สำหรับนักลงทุนที่มีแอปพลิเคชันแล้ว
              สามารถเปิดบัญชีได้ทันทีผ่านเมนู "Port" บริเวณด้านล่างของหน้าจอ
            </div>
          </div>
          <div v-if="errorType == noTsf">
            คุณยังไม่มีบัญชีสำหรับลงทุนกองทุนประเภทภาษี
            <img
              class="w-full max-w-[300px] mt-2 mb-2 mr-auto ml-auto"
              src="https://storage.googleapis.com/scontent.finnomena.com/fint/charlie/tsf-oa.png"
            />
            สามารถเปิดบัญชีได้ทันที ไม่ต้องส่งเอกสารเพิ่มเติม ผ่านแอปพลิเคชัน
            Finnomena โดยเลือกเมนู "Port" และกดที่ปุ่ม "Tax Saving"
          </div>
          <div v-if="errorType == noBankAcc">
            ระบบไม่พบบัญชีธนาคารที่ชำระค่าซื้อกองทุนได้
            กรุณาเชื่อมต่อบัญชีธนาคารของคุณเข้ากับบัญชีลงทุนของ Finnomena
            <br /><br />
            ดูรายละเอียดขั้นตอน
            <a
              class="underline"
              href="https://www.finnomena.com/ats-instruction/"
              target="_blank"
              >คลิก</a
            >
          </div>
          <div v-if="errorType == unknownError">
            เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง
          </div>
        </div>

        <AlertDialogFooter>
          <Button
            class="btn btn-primary"
            @click="batchCheckout()"
            v-if="errorType === null"
          >
            ทำรายการ
          </Button>
          <AlertDialogCancel>ปิด</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
