<template>
    <div>
        <div v-if="tags == 'fund-click'" class="display-inline">
            <fund-click :shortcode="value"/>
        </div>
        <div v-else-if="tags == 'fund-card'">
            <fund-card :shortcode="value"/>
        </div>
        <div v-else-if="tags == 'fund-port'">
            <fund-port :port="value"/>
        </div>
    </div>
</template>
<script>
export default {
    props: ['renderVal'],
    data() {
        return {
            componentString: this.renderVal,
            tags: '',
            value: ''
        }
    },
    mounted() {
        this.value = this.GetValue(this.componentString);
        this.tags = this.GetTag(this.componentString);
    },
    methods: {
        GetTag(tags) {
            const extractedTag = tags.match(/<([^>]+)>/)[1];
            // console.log(extractedTag)
            return extractedTag;
        },
        GetValue(tags) {
            const extractedValue = tags.match(/>([^<]+)</)[1];
            return extractedValue;
        }   
    },
}
</script>
<style>
    
</style>