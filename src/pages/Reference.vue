<template>
    <q-page class="row">
        <ReferenceNav />
    </q-page>
</template>

<script lang="ts">
import ReferenceNav from '../components/Reference/ReferenceNav.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        ReferenceNav
    }
    
})
</script>
