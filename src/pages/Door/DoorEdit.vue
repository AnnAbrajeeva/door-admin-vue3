<template>
  <div class="q-pa-md fit">
    <DoorEditOrAdd />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DoorEditOrAdd from '../../components/Door/DoorEditOrAdd.vue';

export default defineComponent({
  name: 'DoorEdit',

  components: {
    DoorEditOrAdd,
  },

});
</script>
