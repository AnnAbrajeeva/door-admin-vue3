<template>
  <div class="input-wrapper">
    <q-input
      class="q-mr-lg q-pb-none"
      style="width: inherit"
      outlined
      type="number"
      v-model="piece"
      label="Количество"
      suffix="М"
      @change="setPiece"
      :rules="[(val) => (val && val.length > 0) || 'Введите значение']"
    />

    <q-input
      class="q-mr-lg"
      style="width: inherit"
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
    const piece = ref(props.add ? props.add.piece : null);
    const store = useStore();

    const getTotal = computed(() => {
      let total;
      if (props.add && props.add.addition.price && piece.value) {
        total = piece.value * props.add.addition.price;
      }
      return total;
    });

    const setPiece = (piece: number) => {
      if (props.add) {
        store.commit('order/changePiece', {
          value: piece,
          id: props.add.addition.id,
        });
        void store.commit('order/changeTotal', {
          value: getTotal.value,
          id: props.add.addition.id,
        });
      }
    };

     const delAdd = (id: string) => {
        store.commit('order/delAdd', id)
    }

    return {
      piece,
      getTotal,
      setPiece,
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
