import { type HttpResponse } from "~/server/types/http";
import { useUser } from "./UserStore";

const apiPrefix = "charlie-web/api/charlie-service";

export const useChat = defineStore("chat", () => {
  // composables
  const fetch = useRequestFetch();

  // actions
  async function initChat(): Promise<boolean> {
    const user = useUser();

    const res: HttpResponse = await fetch(`${apiPrefix}/langchain-chat/chats`, {
      method: "POST",
    });
    if (res.data.chat_id) {
      user.setChatID(res.data.chat_id);
      return true;
    }

    return false;
  }

  return {
    initChat,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
