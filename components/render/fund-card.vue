<template>
    <div>
        <div>
            <h1>{{shortcode}}</h1>
            <Badge>Pick</Badge>
            <Badge>Fint</Badge>
            <Badge>SSF</Badge>
        </div>
    </div>
</template>
<script>
import { Badge } from '@/components/ui/badge'
export default {
    props: ['shortcode'],
    data() {
        return {
            value: ''
        }
    }
}
</script>
<style></style>