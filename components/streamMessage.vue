<template>
    <div>
        <div class="flex items-start gap-2.5">
            <img class="w-8 h-8 rounded-full mr-2 ml-5" src="../assets/img/logo.png" alt="Finnomena Icon">
            <div
                class="flex flex-col w-full max-w-[800px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">Charlie</span>
                </div>
                <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ data }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['data'],
    data() {
        return {

        }
    },

}
</script>
<style lang="">

</style>