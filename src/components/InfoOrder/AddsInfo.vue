<template>
  <div class="q-pa-md fit">
    <h6 class="mb-5 mt-10 text-weight-bold">Дополнительные параметры</h6>

    <q-table
      :rows="rows"
      row-key="name"
      :dense="$q.screen.lt.md"
      separator="cell"
      no-data-label="Информации нет"
      hide-bottom
      hide-header
      :table-header-style="{ backgroundColor: 'rgb(219 219 219)' }"
    >
      <template v-slot:body>
        <q-tr v-for="add in order.addition" :key="add.id">
          <q-td class="title-cell">{{ add.addition.name }}</q-td>
          <q-td v-if="add.addition.type === 'TRANSOMS'">
            Глубина: {{ add.depth }} м., Площадь: {{ add.area }} м<sup>2</sup>,
            Сумма: {{ add.additionSum }} сум
          </q-td>
          <q-td
            v-if="
              add.addition.type === 'PLATBAND' ||
              add.addition.type === 'CORNICE'
            "
          >
            Длина: {{ add.length }} м., Сумма: {{ add.additionSum }} сум
          </q-td>
          <q-td
            v-if="
              add.addition.type === 'CUBE' ||
              add.addition.type === 'PIMPERNEL' ||
              add.addition.type === 'CASTLE'
            "
          >
            Количество: {{ add.piece }} шт., Сумма: {{ add.additionSum }} сум
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IOrdersResponse } from '../models';

export default defineComponent({
  props: {
    order: {
      required: false,
      type: Object as PropType<IOrdersResponse>,
    },
  },

  setup(props) {
    const rows = [{ order: props.order }];
    return {
      rows,
    };
  },
});
</script>

<style scoped>
.title-cell {
  background-color: rgb(238, 235, 235);
}
</style>
