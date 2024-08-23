import { type HttpResponse } from "~/server/types/http";

const apiPrefix = "charlie-web/api";
const defaultProfileImage =
  "https://storage.googleapis.com/scontent.finnomena.com/fint/finnomena-logo.png";

export const useUser = defineStore("user", () => {
  // composables
  const fetch = useRequestFetch();

  // states
  const user = reactive<UserState>({
    isLoggedIn: false,
    refresh: false,
    userID: null,
    displayName: "",
    imageURL: "",
    chatID: "",
  });

  // getters
  const isLoggedIn = computed((): boolean => {
    return user.isLoggedIn;
  });

  // mutations
  function setLoginStatus(isLogin: boolean) {
    user.isLoggedIn = isLogin;
  }

  function setChatID(chatID: string) {
    user.chatID = chatID;
  }

  // actions
  async function getProfile() {
    const config = useRuntimeConfig();
    const accessToken = useCookie(config.public.auth.cookie.accessToken);
    if (!accessToken.value) {
      user.isLoggedIn = false;
      return;
    }
    try {
      const res: HttpResponse = await fetch(
        `${apiPrefix}/auth/user/mini-profile?access_token=${accessToken.value}`
      );
      user.userID = res.data.user_id;
      user.displayName = res.data.display_name;
      user.imageURL = res.data.profile_url
        ? res.data.profile_url
        : defaultProfileImage;
    } catch (err: unknown) {
      user.isLoggedIn = false;
    }
  }

  return {
    user,
    isLoggedIn,
    getProfile,
    setLoginStatus,
    setChatID,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
