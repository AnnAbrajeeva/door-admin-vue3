<template>
  <div class="input-wrapper">
    <q-input
        style="width: inherit"
       class="q-mr-lg q-pb-none"
      outlined
      readonly
      type="number"
      v-model="length"
      label="Длина"
      suffix="М"
      :rules="[(val) => (val && val.length > 0) || 'Введите значение']"
    />

    <q-input
      style="width: inherit"
      class="q-mr-lg"
      outlined
      type="number"
      readonly
      v-model="total"
      label="Итого"
    />

    <q-btn @click="delAdd(add.addition.id)" style="height: 100%" color="primary" icon="delete" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { ISelectAddition } from '../../../models';
import { useStore } from '../../../../store/index';


export default defineComponent({
props: {
    add: {
      type: Object as PropType<ISelectAddition>,
    },
  },
  setup(props) {
      const length = ref(props.add ? props.add.length : null)
      const total = ref(props.add ? props.add.total : null)
       const store = useStore();
 
  const delAdd = (id: string) => {
        store.commit('order/delAdd', id)
    }

    return {
      length,
      total,
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