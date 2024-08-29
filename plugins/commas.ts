import { defineNuxtPlugin } from '#app';
import commas from './directives/commas';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('commas-seperate', commas);
});