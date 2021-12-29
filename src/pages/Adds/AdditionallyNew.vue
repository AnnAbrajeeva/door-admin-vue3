<template>
  <div class="q-pa-md fit">
    <AddsNewOrEdit />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddsNewOrEdit from '../../components/Additionally/AddsNewOrEdit.vue';

export default defineComponent({
  name: 'AdditionallyNew',

  components: {
    AddsNewOrEdit,
  },

});
</script>