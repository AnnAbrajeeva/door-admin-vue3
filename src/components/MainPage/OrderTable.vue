<template>
  <div class="q-pa-md fit">
    <q-table
      title="Список заказов"
      :rows="orders"
      :columns="columns"
      row-key="name"
      :dense="$q.screen.lt.md"
      separator="cell"
      table-header-class="header"
      :table-header-style="{ backgroundColor: 'rgb(219 219 219)' }"
      no-data-label="Заказов пока нет"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Создать"
          no-caps
          @click="this.$router.push('/new')"
        />
      </template>

      <template v-slot:body-cell-door="row">
        <q-td :props="row">
          {{ row.row.door.name }}
        </q-td>
      </template>

      <template v-slot:body-cell-action="row">
        <q-td :style="{ width: '300px' }" :props="row">
          <q-btn
            class="q-ma-md"
            dense
            round
            flat
            color="grey"
            @click="showOrder(row.row)"
            icon="visibility"
          ></q-btn>
          <q-btn
            class="q-ma-md"
            dense
            round
            flat
            color="grey"
            @click="deleteOrder(row.row)"
            icon="delete"
          ></q-btn>
          <q-btn
            class="q-ma-md"
            dense
            round
            flat
            color="grey"
            @click="printOrder(row.row)"
            icon="print"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { api } from '../../boot/axios';
import { useQuasar } from 'quasar';
import { IOrdersResponse } from '../models';
import { AxiosError, AxiosResponse } from 'axios';
import { errorFunc } from '../../utils/errorFunc';
import { useRouter } from 'vue-router';

const getOrders = async () => {
  const { data }: { data: IOrdersResponse[] | null } = await api.get(
    '/api/v1/order'
  );
  return data;
};

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const orders = ref<IOrdersResponse[] | null>();
    const router = useRouter();
    const printing = 'print';

    const columns = [
      {
        name: 'contractId',
        label: '#',
        align: 'center',
        field: 'contractId',
        sortable: true,
      },
      {
        name: 'clientName',
        align: 'center',
        label: 'Клиент',
        field: 'clientName',
        sortable: true,
      },
      {
        name: 'door',
        align: 'center',
        label: 'Дверь',
        field: 'door',
        sortable: true,
      },
      {
        name: 'price',
        align: 'center',
        label: 'Стоимость',
        field: 'price',
        sortable: true,
      },
      { name: 'action', align: 'center', label: 'Action', field: 'action' },
    ];
    onMounted(() => {
      getOrders()
        .then((res) => {
          orders.value = res;
          $q.loading.hide();
        })
        .catch((e) => {
          const { response } = e as AxiosError;
          const { status } = response as AxiosResponse;
          let err = errorFunc(status);
          $q.notify({
            type: 'negative',
            message: `${err}`,
          });
        });
    });

    function printOrder(item: IOrdersResponse): void {
      void router.push({
        name: 'Order',
        params: {
          id: item.contractId,
          printing: printing,
        },
      });
    }

    function deleteOrder(item: IOrdersResponse): void {
      if (orders.value) {
        const orderIndex: number = orders.value.findIndex(
          (order: IOrdersResponse) => order.id == item.id
        );
        orders.value.splice(orderIndex, 1);
      }
    }

    function showOrder(item: IOrdersResponse): void {
      void router.push({
        name: 'Order',
        params: {
          id: item.contractId,
        },
      });
    }

    return {
      columns,
      orders,
      printOrder,
      deleteOrder,
      showOrder,
    };
  },
});
</script>

<style scoped>
.header {
  font-size: 20px;
}
</style>


