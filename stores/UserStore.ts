import { type HttpResponse } from "~/server/types/http";

const apiPrefix = "/fint-token-web/api";

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
  });

  // getters
  const isLoggedIn = computed((): boolean => {
    return user.isLoggedIn;
  });

  // mutations
  function setLoginStatus(isLogin: boolean) {
    user.isLoggedIn = isLogin;
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
      user.imageURL = res.data.profile_url;
    } catch (err: unknown) {
      user.isLoggedIn = false;
    }
  }

  return {
    user,
    isLoggedIn,
    getProfile,
    setLoginStatus,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
