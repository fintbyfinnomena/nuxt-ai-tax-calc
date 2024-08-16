export default defineNuxtPlugin(() => {
  return {
    provide: {
      tagEvent: (action: string, location: string, params: any) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "custom_event",
          name: action,
          location: location,
          params: params,
        });
      },
    },
  };
});
