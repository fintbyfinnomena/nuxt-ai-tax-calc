<template>

</template>
<script>
import { useTaxInfoStore } from '../../stores/TaxInfoStore';

export default {
    props: ['value'],
    data() {
        return {
            taxInfoStore: null,
            field: "",
            newValue: "",
        }
    },
    created() {
        this.taxInfoStore = useTaxInfoStore()
    },
    mounted() {
        this.field = this.value.split(",")[0];
        this.field = this.field.split('"')[1];

        this.newValue = this.value.split(",")[1];
        this.newValue = this.newValue.split(']')[0];

        this.taxInfoStore.update(this.field.trim(), this.newValue.trim());
    }
}
</script>