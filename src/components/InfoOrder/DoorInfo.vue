<template>
  <div class="q-pa-md fit">
    <h6 class="mb-5 mt-10 text-weight-bold">Дверь</h6>

    <q-table
      :rows="rows"
      row-key="name"
      :dense="$q.screen.lt.md"
      separator="cell"
      no-data-label="Заказов пока нет"
      hide-bottom
      hide-header
    >
      <template v-slot:body>
        <q-tr>
          <q-td class="title-cell">Название</q-td>
          <q-td>{{ order.door.name }}</q-td>
          <q-td class="title-cell">Длина</q-td>
          <q-td>{{ order.doorLength }} м.</q-td>
        </q-tr>
        <q-tr>
          <q-td class="title-cell">Цена</q-td>
          <q-td>{{ order.door.price }} сум</q-td>
          <q-td class="title-cell">Ширина</q-td>
          <q-td>{{ order.doorWidth }} м.</q-td>
        </q-tr>
        <q-tr>
          <q-td class="title-cell">Итого</q-td>
          <q-td>{{ order.doorPrice }} сум</q-td>
          <q-td class="title-cell">Площадь</q-td>
          <q-td>{{ order.doorArea }} м<sup>2</sup></q-td>
        </q-tr>
      </template>

      <template v-if="order.door.price" v-slot:body-cell-doorPrice="rows">
        <q-td :props="rows">
          {{ rows.row.doorName.door.price }}
        </q-td>
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
    let rows;
    if (props.order) {
      rows = [{ order: props.order }];
    }

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
