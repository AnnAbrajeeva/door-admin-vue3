<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      label="Добавить дверь"
      color="black"
      class="center"
      glossy
      @click="orderModal = true"
    />

    <q-dialog
      v-model="orderModal"
      :maximized="true"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <DoorInfo />

        <AddsInfo />

        <SelectAdditionals />

        <q-btn @click="addDoor" class="q-ma-md" color="primary" icon="library_add" label="Сохранить" />
        
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DoorInfo from './DoorInfo.vue'
import AddsInfo from './AddsInfo.vue'
import SelectAdditionals from './SelectAdditionals.vue'
import {useStore} from '../../store/index'


export default defineComponent({
  components: {
      DoorInfo,
      AddsInfo,
      SelectAdditionals
    },
  setup() {
    let orderModal = ref();
    const store = useStore()

    const addDoor = () => {
      store.commit('order/addDoor')
      orderModal.value = false
    }

    return {
      orderModal,
      addDoor
    };
  },
});
</script>

<style scoped>
.center {
  margin: 0 auto;
  display: block;
}
</style>


