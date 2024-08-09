import { defineStore } from "pinia";
export const usePortStore = defineStore("portStore", {
    state: () => ({
        color_scheme: {
            SSF: ["#7cdbff","#47a5c9","#1d7596","#0b5a78","#0e3a4a"],
            RMF: ["#bf74d2","#9244a6","#712285","#600b75","#4a1757"],
            TESG: ["#40ed90","#2bad67","#168047","#409467","#135230"]
        }
    })
})