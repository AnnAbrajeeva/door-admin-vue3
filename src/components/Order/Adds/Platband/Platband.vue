<template>
  <div>
    <q-input
      class="q-mt-md"
      outlined
      readonly
      type="number"
      v-model="getLength"
      label="Длина"
      suffix="М"
    />

    <q-input
      class="q-mt-md"
      outlined
      type="number"
      readonly
      v-model="getTotal"
      label="Итого"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { IOrderStore } from '../../../models';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { useStore } from '../../../../store/index';

export default defineComponent({

  setup() {
    const store = useStore();
    const { useState } = createNamespacedHelpers<IOrderStore>('order');
    const { addition } = useState(['addition']);
    const { door } = useState(['door']);
 
    const getLength = computed(() => {
        let length
        if(door.value.length) {
          length = Number(door.value.length*2) + Number(door.value.width)
        }
        store.commit('order/setLength', length);
        return length
      });

    const getTotal = computed(() => {
        let total
        if(getLength.value && addition.value.addition.price) {
          total = getLength.value * addition.value.addition.price
        }
        void store.commit('order/setTotal', total);
        return total
      });

    return {
      getLength,
      getTotal,
    };
  },
});
</script>
