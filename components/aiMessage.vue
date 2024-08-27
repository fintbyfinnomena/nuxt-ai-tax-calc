<script>
import { useMessageStore } from "../stores/MessageStore";
import { useUser } from "../stores/UserStore";
import fundcard from "./render/fund-card.vue";
import showdown from "showdown";
import { useElementHover } from "@vueuse/core";

export default {
  props: ["data", "feedback"],
  data() {
    return {
      SplittedArray: [],
      MessageStore: null,
      UserStore: null,
      RenderObjectArray: [],
      config: null,
      isAdvisoryMessage: false,
    };
  },
  created() {
    this.MessageStore = useMessageStore();
    this.config = useRuntimeConfig();
    this.UserStore = useUser();
  },
  mounted() {
    this.SplittedArray = this.GenerateArray(this.data);
    this.GenerateRenderObject();
    this.ArrangeRenderObject();
  },
  methods: {
    MDtoHTML(mdString) {
      let converter = new showdown.Converter({
        openLinksInNewWindow: true,
        requireSpaceBeforeHeadingText: true,
        simpleLineBreaks: true,
        tables: true,
        simplifiedAutoLink: true,
        disableForced4SpacesIndentedSublists: true,
      });
      return converter.makeHtml(mdString);
    },
    GenerateArray(str) {
      const tagRegex = /(<\/?[^>]+>)/g;
      const parts = str.split(tagRegex).filter((part) => part.trim() !== "");
      const result = [];

      let buffer = "";
      let insideTag = false;

      for (const part of parts) {
        if (part.startsWith("<") && !insideTag) {
          if (buffer.trim()) {
            result.push(buffer.trim());
          }
          buffer = part;
          insideTag = true;
        } else if (insideTag) {
          buffer += part;
          if (part.endsWith(">")) {
            result.push(buffer.trim());
            buffer = "";
            insideTag = false;
          }
        } else {
          buffer += part;
        }
      }

      if (buffer.trim()) {
        result.push(buffer.trim());
      }

      return result;
    },
    GenerateRenderObject() {
      this.SplittedArray.forEach((element) => {
        if (element.startsWith("<")) {
          this.RenderObjectArray.push({
            index: this.MessageStore.message_obj.index,
            role: "ai",
            type: "render",
            value: element,
          });
        } else {
          let cleanText = this.removeEndingDash(element);
          if (cleanText != "") {
            this.RenderObjectArray.push({
              index: this.MessageStore.message_obj.index,
              role: "ai",
              type: "text",
              value: this.MDtoHTML(cleanText),
            });
          }
        }
      });
    },
    ArrangeRenderObject() {
      const fundCardElements = this.RenderObjectArray.filter((item) =>
        item.value.startsWith("<fund-card>")
      );
      const nonFundCardElements = this.RenderObjectArray.filter(
        (item) => !item.value.startsWith("<fund-card>")
      );

      const fundPortElement = this.RenderObjectArray.filter((item) =>
        item.value.startsWith("<fund-port>")
      );

      this.RenderObjectArray = [
        ...nonFundCardElements,
        {
          type: "render-group",
          value: fundCardElements,
        },
      ];

      this.isAdvisoryMessage = fundPortElement.length > 0;
    },
    downvote() {
      fetch(
        `charlie-web/api/charlie-service/langchain-chat/chats/${this.UserStore.user.chatID}/thumb-down`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Finno-User-Id": this.UserStore.user.userID,
          },
          body: JSON.stringify({ index: this.feedback }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          this.MessageStore.message_obj.messagesList[
            this.feedback
          ].downvote = true;
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    },
    removeEndingDash(text) {
      if (text.endsWith("-")) {
        return text.slice(0, -1);
      } else {
        return text;
      }
    },
  },
};
</script>
<template>
  <div>
    <div>
      <div class="flex items-start gap-0.5">
        <img
          class="w-8 h-8 rounded-full mr-2 ml-2 sm:ml-5"
          src="../assets/img/logo.png"
          alt="Finnomena Icon"
        />
        <div>
          <div
            class="flex flex-col w-auto max-w-[300px] sm:max-w-[450px] md:max-w-[450px] lg:max-w-[600px] xl:max-w-[800px] leading-1.5 p-4 bg-gradient-to-r from-finnopurple to-finnoblue rounded-e-xl rounded-es-xl dark:bg-gray-700 border border-pink-200"
          >
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-gray-900 dark:text-white"
                >Charlie</span
              >
            </div>
            <div
              v-for="item in RenderObjectArray"
              :key="item.index"
              class="inline"
            >
              <div
                v-if="item.type === 'text' && item.value != ''"
                class="text-sm font-normal whitespace-normal text-balance text-gray-900 dark:text-white inline"
              >
                <MarkDown :val="item.value" />
              </div>

              <div v-else-if="item.type === 'render'" class="inline">
                <Render :renderVal="item.value" />
              </div>

              <div v-else-if="item.type === 'render-group'" class="inline">
                <RenderGroup :renderVal="item.value" />
              </div>
            </div>
            <div v-if="isAdvisoryMessage" class="text-xs mt-3">
              เนื่องจากระบบยังอยู่ในช่วงทดสอบ อาจจะให้ข้อมูลที่ผิดพลาดได้
              ในการลงทุนจริงหลังจากใช้งานนักลงทุนควรตรวจสอบข้อมูลให้ละเอียดอีกครั้ง
              |
              กองทุนแนะนำและคำแนะนำในการจัดพอร์ตกองทุนประหยัดภาษีทั้งหมดเป็นคำแนะนำแบบทั่วไปจากบลน.ฟินโนมีนาจำกัด
              ระบบ Charlie เพียงแค่นำข้อมูลจากผู้ลงทุนเพื่อใช้ในการคำนวณเท่านั้น
              |
              ผู้ลงทุนควรศึกษาข้อมูลเกี่ยวกับสิทธิประโยชน์ทางภาษีที่ระบุไว้ในคู่มือการลงทุนในกองทุนรวมเพื่อสิทธิ์ประโยชน์ทางภาษีก่อนตัดสินใจลงทุน
            </div>
          </div>
          <div v-if="this.MessageStore.message_obj.messagesList.length > 0">
            <div
              v-if="
                this.MessageStore.message_obj.messagesList[this.feedback]
                  .downvote == false
              "
              class="mt-3 hover:cursor-pointer"
              @click="downvote(this.feedback)"
            >
              <Icon
                icon="material-symbols:thumb-down-outline-sharp"
                size="1.4em"
                class="hover:bg-gray-200"
              />
            </div>
            <div v-else class="mt-3">
              <Icon icon="ic:sharp-thumb-down-alt" size="1.4em" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
