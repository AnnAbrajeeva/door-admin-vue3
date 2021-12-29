<template>
  <div class="input-wrapper">
    <q-input
      style="width: inherit"
      class="q-mr-lg q-pb-none"
      outlined
      type="number"
      v-model="length"
      label="Длина"
      suffix="М"
      @change="setLength"
      :rules="[(val) => (val && val.length > 0) || 'Введите значение']"
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
import { ISelectAddition } from '../../../models';
import { useStore } from '../../../../store/index';

export default defineComponent({
  props: {
    add: {
      type: Object as PropType<ISelectAddition>,
    },
  },

  setup(props) {
    const length = ref(props.add ? props.add.length : null);
    const store = useStore()

    const getTotal = computed(() => {
        let total
        if(props.add && props.add.addition.price && length.value) {
          total = length.value * props.add.addition.price
        } else {
          total = null
        }       
         return total
      });

    const setLength = (length: number) => {
        if(props.add) {
            store.commit('order/changeLength', {value: length, id: props.add.addition.id});
            void store.commit('order/changeTotal', {value: getTotal.value, id: props.add.addition.id});
        }       
    };

    const delAdd = (id: string) => {
        store.commit('order/delAdd', id)
    }

    return {
      length,
      getTotal,
      setLength,
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