<template>
  <div>
    <q-input
      class="q-mt-md"
      outlined
      type="number"
      v-model="piece"
      label="Количество"
      suffix="шт."
      @change="setPiece"
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
    const piece = ref();
    const store = useStore();
    const { useState } = createNamespacedHelpers<IOrderStore>('order');
    const { addition } = useState(['addition']);
 
    const getTotal = computed(() => {
        let total
        if(addition.value.addition.price) {
          total = piece.value * addition.value.addition.price
        }
        return total
      });

    const setPiece = (piece: number) => {
      store.commit('order/setPiece', piece);
    };

    watch(
      () => getTotal.value,
      (currentValue) => {
        void store.commit('order/setTotal', currentValue);
      }
    );

    return {
      piece,
      getTotal,
      setPiece,
    };
  },
});
</script>
