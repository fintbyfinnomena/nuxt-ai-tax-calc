import * as amplitude from "@amplitude/analytics-browser";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  amplitude.init(config.public.amplitude.id, {
    autocapture: {
      elementInteractions: {
        dataAttributePrefix: "data-fn-",
      },
    },
  });

  const { user } = useUser();
  if (user.isLoggedIn && user.userID) {
    amplitude.setUserId(String(user.userID));
  }
});
