<template>
  <div>
    <q-input
      class="q-mt-md"
      outlined
      type="number"
      v-model="length"
      label="Длина"
      suffix="М"
      @change="setLength"
      :rules="[(val) => (val && val.length > 0) || 'Введите значение']"
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
import { defineComponent, computed, ref, watch } from 'vue';
import { IOrderStore } from '../../../models';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { useStore } from '../../../../store/index';

export default defineComponent({

  setup() {
    const length = ref();
    const store = useStore();
    const { useState } = createNamespacedHelpers<IOrderStore>('order');
    const { addition } = useState(['addition']);
 
    const getTotal = computed(() => {
        let total
        if(length.value && addition.value.addition.price) {
          total = length.value * addition.value.addition.price
        }
        return total
      });

    const setLength = (length: number) => {
      store.commit('order/setLength', length);
    };

    watch(
      () => getTotal.value as number,
      (currentValue) => {
        void store.commit('order/setTotal', currentValue);
      }
    );

    return {
      length,
      setLength,
      getTotal,
    };
  },
});
</script>
