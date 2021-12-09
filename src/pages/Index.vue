<template>
  <q-page class="row justify-evenly">
   <OrderTable />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrderTable from '../components/MainPage/OrderTable.vue'


export default defineComponent({
  name: 'PageIndex',

  components: {
    OrderTable
  },
  
  setup() {
   
  
    return {  };
  }
});
</script>
