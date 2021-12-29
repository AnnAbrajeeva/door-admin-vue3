<template>
  <div class="q-pa-md fit">
    <div class="row items-center">
      <q-btn @click="goBack" flat round color="primary" icon="arrow_back" />
      <h6 class="mb-5 text-weight-bold">Заказ #{{ order.contractId }}</h6>
    </div>

    <q-table
      :rows="rows"
      row-key="name"
      :dense="$q.screen.lt.md"
      separator="cell"
      no-data-label="Заказов пока нет"
      hide-bottom
      hide-header
      :table-header-style="{ backgroundColor: 'rgb(219 219 219)' }"
    >
      <template v-slot:body>
        <q-tr>
          <q-td class="title-cell">Заявка</q-td>
          <q-td>#{{ order.contractId }}</q-td>
          <q-td class="title-cell">Клиент</q-td>
          <q-td>{{ order.clientName }}</q-td>
          <q-td class="title-cell">Итого</q-td>
          <q-td>{{ order.price }}</q-td>
        </q-tr>
        <q-tr>
          <q-td class="title-cell">Создан</q-td>
          <q-td>{{ order.createdDate }}</q-td>
          <q-td class="title-cell">Телефон</q-td>
          <q-td>{{ order.clientPhone }}</q-td>
          <q-td class="title-cell">Срок</q-td>
          <q-td>
            <span v-if="order.periodDate"
              >{{ order.periodDate[0].split('-').reverse().join('.') }} -
              {{ order.periodDate[1].split('-').reverse().join('.') }}</span
            >
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IOrdersResponse } from '../models';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    order: {
      required: false,
      type: Object as PropType<IOrdersResponse>,
    },
  },

  setup(props) {
    const router = useRouter();

    let rows;
    if (props.order) {
      rows = [{ order: props.order }];
    }

    function goBack() {
      router.go(-1);
    }

    return {
      rows,
      goBack,
    };
  },
});
</script>

<style scoped>
.title-cell {
  background-color: rgb(238, 235, 235);
}
</style>
