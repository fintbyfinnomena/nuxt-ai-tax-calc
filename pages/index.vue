<template>
  <div class="w-11/12 md:w-5/6 lg:w-4/6 h-screen mx-auto flex flex-col">
    <navbar />
    <div
      id="wrap"
      class="bg-white grid lg:grid-cols-12 shadow-lg p-5 sm:py-10 sm:px-10 md:py-16 md:px-20 lg:py-25 lg:px-20 rounded-xl"
    >
      <div
        class="mr-auto place-self-center lg:col-span-7 justify-center items-center"
      >
        <div class="lg:hidden text-center mb-10 chat-logo">
          <img
            src="../assets/img/chat-logo.png"
            alt="logo"
            style="height: 15rem"
          />
        </div>
        <h1
          class="max-w-2xl mb-4 text-3xl text-primary font-bold leading-none flex align-middle"
        >
          SSF, RMF, ThaiESG ให้ AI ช่วยแนะนำ
        </h1>
        <h1
          class="max-w-xl mb-4 font-medium text-primary md:text-lg lg:text-lg"
        >
          อยากรู้ อยากซื้อ อยากวางแผนกองทุนประหยัดภาษี Finnomena Charlie
          พร้อมตอบคำถามคุณ
        </h1>
        <ul class="text-base mb-6">
          <li class="flex flex-column mt-2">
            <Icon icon="fa:money" class="mr-2" size="1.5em" />
            <div>
              <div class="font-semibold">
                อยากลงทุน 100,000 บาท จะกระจายลงทุนยังไงดี ?
              </div>
              <div>
                แนะนำกองทุนที่เหมาะกับคุณ จากเงินลงทุน ความเสี่ยง และอื่นๆ
              </div>
            </div>
          </li>
          <li class="flex flex-column mt-2">
            <Icon icon="fa:question" class="mr-2" size="1.5em" />
            <div>
              <div class="font-semibold">
                <span>กอง&nbsp;</span>
                <Transition
                  ><span :key="showingFund">
                    {{ showingFund }}</span
                  ></Transition
                >
              </div>
              <div>
                ช่วยหากองทุนตามความต้องการของคุณ
                หรือช่วยเปรียบเทียบกองทุนให้ก็ได้
              </div>
            </div>
          </li>
          <li class="flex flex-column mt-2">
            <Icon icon="fa:book" class="mr-2" size="1.5em" />
            <div>
              <div class="font-semibold">สอนการลงทุน SSF ฉันหน่อย</div>
              <div>เสริมศักยภาพการลงทุน ตอบทุกข้อสงสัยการลงทุน</div>
            </div>
          </li>
        </ul>
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
          class="h-3/5 w-auto chat-logo"
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
      showingFund: null,

      fundList: [
        "KPE-RMF-UH",
        "A-IOJSSF",
        "UAC-SSF",
        "KP-AEEE-SSF",
        "M-AEO-MF",
      ],
    };
  },
  created() {
    this.FinnoAuthStore = useAuth();
  },
  mounted() {
    this.intervalFundShow();
  },
  methods: {
    SignInWithFinno() {
      this.FinnoAuthStore.login();
    },
    intervalFundShow() {
      let i = 0;
      this.showingFund = this.fundList[i] + " ดีไหม?";
      setInterval(() => {
        i++;
        if (i >= this.fundList.length) {
          i = 0;
        }
        this.showingFund = this.fundList[i] + " ดีไหม?";
      }, 2500);
    },
  },
};
</script>
<style scoped lang="scss">
h1 {
  font-weight: 700;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@keyframes rotateTransform {
  0% {
    transform: perspective(1500px) rotateY(25deg);
  }
  50% {
    transform: perspective(3000px) rotateY(5deg);
  }
  100% {
    transform: perspective(1500px) rotateY(25deg);
  }
}

.chat-logo {
  animation: rotateTransform 2.5s infinite ease-in-out;
}
</style>
