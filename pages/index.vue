<template>
  <div>
    <div class="grid max-w-screen-xl mx-auto h-screen">
      <div class="bg-white grid max-w-screen-xl mx-auto my-20 lg:gap-10 xl:gap-0 lg:grid-cols-12 shadow-lg p-20 rounded-xl">
        <div class="mr-auto place-self-center lg:col-span-7 justify-center items-center">
          <h1 class="max-w-2xl mb-4 text-3xl text-primary font-bold leading-none flex align-middle">
            สวัสดี! Charlie พร้อมช่วยคุณเรื่องประหยัดภาษี
          </h1>
          <h1 class="max-w-xl mb-6 font-medium text-primary lg:mb-8 md:text-lg lg:text-lg">
            ให้เรื่องการลดหย่อนภาษีเป็นเรื่องง่ายๆ ทั้งจัดพอร์ตกองทุน, แนะนำกองทุนในประเภทที่คุณสนใจ
            หรือความรู้ทั่วไปเกี่ยวกับกองทุนประหยัดภาษี</h1>
          <button id="mybutton" @click="LoginFirebase()"
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-semibold text-center text-white rounded-full bg-primary hover:dark:focus:ring-primary-900 hover:shadow-xl">
            <div class="size-8 mr-5"><img
                src="https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png"
                class="object-cover"></div>Continue with Google
            <svg class="w-5 h-5 ml-2 -mr-1" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div
          class="hidden lg:mt-0 place-self-center lg:col-span-5 lg:flex text-center h-full justify-center items-center">
          <img class="h-3/5 w-auto" src="../assets/img/chat-logo.png" alt="mockup">
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthStore } from "../stores/AuthStore";

export default {
  data() {
    return {
      nuxtApp : useNuxtApp(),
      AuthStore: null
    };
  },
  created() {
    this.AuthStore = useAuthStore()
  },
  methods: {
    LoginFirebase() {
      signInWithPopup(this.nuxtApp.$auth, new GoogleAuthProvider())
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          // console.log(result.user.email + " EMAIL");
          window.location.href = "/prompt";
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(error)
          // ...
        });
    }
  }
}
</script>
<style>
h1 {
  font-weight: 700;
}
</style>
