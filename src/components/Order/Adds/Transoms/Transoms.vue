<template>
  <div>
    <q-input
      class="q-mt-md"
      outlined
      type="number"
      v-model="deep"
      label="Глубина"
      suffix="М"
      @change="setDeep"
      :rules="[(val) => (val && val.length > 0) || 'Введите значение']"
    />

    <q-input
      class="q-mt-md"
      outlined
      type="number"
      readonly
      v-model="getSquare"
      label="Площадь"
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
    const deep = ref();
    const store = useStore();
    const { useState } = createNamespacedHelpers<IOrderStore>('order');
    const { door } = useState(['door']);
    const { addition } = useState(['addition']);
 
    const getTotal = computed(() => {
        let total
        if(getSquare.value && addition.value.addition.price && door.value.width) {
          total = getSquare.value * door.value.width * addition.value.addition.price
        }
        return total
      });

    const getSquare = computed(() => {
      return deep.value && door.value.width && door.value.length
        ? door.value.length * door.value.width * deep.value
        : null;
    });

    const setDeep = (deep: number) => {
      store.commit('order/setDeep', deep);
    };

    watch(
      () => getSquare.value,
      (currentValue) => {
        void store.commit('order/setSquare', currentValue);
      }
    );

    watch(
      () => getTotal.value as number,
      (currentValue) => {
        void store.commit('order/setTotal', currentValue);
      }
    );

    return {
      deep,
      getSquare,
      getTotal,
      setDeep,
    };
  },
});
</script>
