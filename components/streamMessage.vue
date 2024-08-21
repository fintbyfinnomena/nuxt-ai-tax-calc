<template>
    <div>
        <div class="flex items-start gap-2.5">
            <img class="w-8 h-8 rounded-full mr-2 ml-5" src="../assets/img/logo.png" alt="Finnomena Icon">
            <div class="flex flex-col w-auto max-w-[280px] md:max-w-[450px] lg:max-w-[600px] xl:max-w-[800px] leading-1.5 p-4 bg-gradient-to-r from-finnopurple to-finnoblue rounded-e-xl rounded-es-xl dark:bg-gray-700 border border-pink-200">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">Charlie</span>
                </div>
                <div class="text-sm font-normal whitespace-pre-wrap py-2.5 text-gray-900 dark:text-white">{{ data }}</div>
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