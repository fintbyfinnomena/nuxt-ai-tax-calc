<template>
  <div class="w-11/12 md:w-5/6 lg:w-4/6 h-screen mx-auto flex flex-col">
    <navbar />
    <div
      id="wrap"
      class="bg-white grid lg:grid-cols-12 shadow-lg p-5 sm:py-10 sm:px-10 md:py-20 md:px-20 lg:py-25 lg:px-20 rounded-xl"
    >
      <div
        class="mr-auto place-self-center lg:col-span-7 justify-center items-center"
      >
        <div class="lg:hidden text-center mb-10">
          <img
            src="../assets/img/chat-logo.png"
            alt="logo"
            style="height: 15rem"
          />
        </div>
        <h1
          class="max-w-2xl mb-4 text-3xl text-primary font-bold leading-none flex align-middle"
        >
          สวัสดี! Charlie พร้อมช่วยคุณเรื่องประหยัดภาษี
        </h1>
        <h1
          class="max-w-xl mb-6 font-medium text-primary lg:mb-8 md:text-lg lg:text-lg"
        >
          ให้เรื่องการลดหน่อยภาษีเป็นเรื่องง่ายๆ
          ทั้งแนะนำกองทุนในประเภทที่คุณสนใจ
          ความรู้ทั่วไปเกี่ยวกับกองทุนประหยัดภาษี
          รวมถึงเรื่องแนะนำการจัดพอร์ตกองทุนประหยัดภาษี
        </h1>
        <button
          id="mybutton"
          @click="SignInWithFinno()"
          data-fn-location="intro"
          data-fn-action="start-button_click"
          class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-semibold text-center text-white rounded-md bg-primary hover:dark:focus:ring-primary-900 hover:shadow-xl"
        >
          เริ่มสนทนากับ Charlie
          <svg
            class="w-5 h-5 ml-2 -mr-1"
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <hr class="my-4" />
        <div class="flex flex-col space-y-2 text-sm">
          <div>
            ระบบ Charlie
            ยังอยู่ในช่วงทดสอบและจะพยายามทำดีที่สุดในการให้ข้อมูลกับนักลงทุน
          </div>
          <div>
            <ul class="list-disc list-outside pl-7">
              <li>
                ระบบอาจจะให้ข้อมูลที่ผิดพลาดได้
                ในการลงทุนจริงหลังจากใช้งานนักลงทุนควรหาข้อมูลเพิ่มเติม
                หรือดูข้อมูลผ่านเว็บไซต์/แอปพลิเคชัน Finnomena อีกครั้ง
              </li>
              <li>
                กองทุนแนะนำและคำแนะนำในการจัดพอร์ตกองทุนประหยัดภาษีทั้งหมดเป็นคำแนะนำแบบทั่วไปจากบลน.ฟินโนมีนา
                จำกัด
              </li>
            </ul>
          </div>
          <div>
            การกดเริ่มสนทนา แสดงว่าคุณเข้าใจและยอมรับ
            <terms class="inline" text="ข้อตกลงและเงื่อนไขการใช้งาน" />
            แล้ว <br /><br />หากมีข้อสงสัย
            หรือพบปัญหาการใช้งานสามารถติดต่อได้ทางอีเมล
            <a class="underline" href="mailto: support@finnomena.com"
              >support@finnomena.com</a
            >
            หรือเบอร์โทรศัพท์
            <a class="underline" href="tel: 02-026-5100"> 02-026-5100 </a>
          </div>
        </div>
      </div>
      <div
        class="hidden lg:mt-0 place-self-center lg:col-span-5 lg:flex text-center h-full justify-center items-center"
      >
        <img
          class="h-3/5 w-auto"
          src="../assets/img/chat-logo.png"
          alt="mockup"
        />
      </div>
    </div>
    <div id="footer" class="mt-4">
      <p class="text-sm text-gray-500">
        <Icon icon="iconoir:info-circle" size="1.2em" />
        ระบบคำนวณยอดเงินลงทุนในกองทุนลดหย่อนภาษีนี้เป็นการคำนวณเพียงเบื้องต้น
        โดยใช้ข้อมูลจากกรมสรรพากรสำหรับปีภาษี 2567 เท่านั้น
        ทางบริษัทขอไม่รับรองความถูกต้องของข้อมูลและผลลัพธ์
        ในกรณีที่มีการเปลี่ยนแปลงข้อมูลเกี่ยวกับการลดหย่อนภาษี...<terms
          class="inline"
          text="อ่านเพิ่มเติม"
        />
      </p>
    </div>
  </div>
</template>
<script>
import { useAuth } from "../stores/FinnoAuthStore";

export default {
  data() {
    return {
      nuxtApp: useNuxtApp(),
      FinnoAuthStore: null,
    };
  },
  created() {
    this.FinnoAuthStore = useAuth();
  },
  methods: {
    SignInWithFinno() {
      this.FinnoAuthStore.login();
    },
  },
};
</script>
<style>
h1 {
  font-weight: 700;
}
</style>
