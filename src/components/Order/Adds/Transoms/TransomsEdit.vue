<template>
  <div class="input-wrapper">
    <q-input
      style="width: inherit"
      class="q-mr-lg q-pb-none"
      outlined
      type="number"
      v-model="deep"
      label="Глубина"
      suffix="М"
      @change="setDeep"
      :rules="[(val) => (val && val.length > 0) || 'Введите значение']"
    />

    <q-input
      style="width: inherit"
      class="q-mr-lg"
      outlined
      type="number"
      readonly
      v-model="getSquare"
      label="Площадь"
    />

    <q-input
      style="width: inherit"
      class="q-mr-lg"
      outlined
      type="number"
      readonly
      v-model="getTotal"
      label="Итого"
    />

    <q-btn @click="delAdd(add.addition.id)" style="height: 100%" color="primary" icon="delete" />
    
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue';
import { IStore, ISelectAddition } from '../../../models';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { useStore } from '../../../../store/index';

export default defineComponent({
  props: {
    add: {
      type: Object as PropType<ISelectAddition>,
    },
  },

  setup(props) {
    const deep = ref(props.add ? props.add.deep : null);
    const store = useStore()

    const { useState } = createNamespacedHelpers<IStore>('order');
    const { door } = useState(['door']);

    const getTotal = computed(() => {
        let total
        if(props.add && props.add.addition && props.add.addition.price && door.value.width && getSquare.value) {
          total = getSquare.value * door.value.width * props.add.addition.price
        } else {
          total = null
        }       
         return total
      });

    const getSquare = computed(() => {
      return deep.value && door.value.width && door.value.length
        ? door.value.length * door.value.width * deep.value
        : null;
    });

    const setDeep = (deep: number) => {
        if(props.add) {
            store.commit('order/changeDeep', {value: deep, id: props.add.addition.id});
            void store.commit('order/changeSquare', {value: getSquare.value, id: props.add.addition.id});
            void store.commit('order/changeTotal', {value: getTotal.value, id: props.add.addition.id});
        }
        
    };

    const delAdd = (id: string) => {
        store.commit('order/delAdd', id)
    }

    return {
      deep,
      getSquare,
      getTotal,
      setDeep,
      delAdd
    };
  },
});
</script>


<style scoped>
.input-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 10px;
}
</style>