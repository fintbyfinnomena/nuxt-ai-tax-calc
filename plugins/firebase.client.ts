import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: "AIzaSyDiJKgpnI9_AOr8mOD21MMUSc60IdAf5nw",
        authDomain: "finnotaxai.firebaseapp.com",
        projectId: "finnotaxai",
        storageBucket: "finnotaxai.appspot.com",
        messagingSenderId: "32636388113",
        appId: "1:32636388113:web:23a10db6c1314b389102b0",
        measurementId: "G-MJ1BBLHN59"
    };

    const app = initializeApp(firebaseConfig)

    const auth = getAuth(app)

    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)

})