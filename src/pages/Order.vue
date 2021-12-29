<template>
  <q-page id="printMe" class="row justify-evenly">
    <OrderInfo v-if="order" :order="order" />
    <DoorInfo v-if="order" :order="order" />
    <AddsInfo v-if="order" :order="order" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent,  ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { IOrdersResponse } from '../components/models';
import { api } from '../boot/axios';
import { useQuasar } from 'quasar';
import { AxiosError, AxiosResponse } from 'axios';
import { errorFunc } from '../utils/errorFunc';
import OrderInfo from '../components/InfoOrder/OrderInfo.vue';
import DoorInfo from '../components/InfoOrder/DoorInfo.vue';
import AddsInfo from '../components/InfoOrder/AddsInfo.vue';

export default defineComponent({
  name: 'Order',

  components: {
    OrderInfo,
    DoorInfo,
    AddsInfo,
  },

  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const order = ref();

    const getOrder = async () => {
      await api.get(
        `/api/v1/order/find-by-contract/${route.params.id as string}`
      )
       .then((res: AxiosResponse<IOrdersResponse>) => {
          order.value = res.data;
          $q.loading.hide();
          nextTick(() => {
            if (route.params.printing && order.value) {
                print();
          }
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
       })
    }

    void getOrder()
    function print(): void {
       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const printContents = document.getElementById('printMe')!.innerHTML;
    const originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
    }

    return {
      order,
    };
  }
  
});
</script>


