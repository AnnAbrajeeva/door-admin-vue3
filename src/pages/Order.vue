<template>
  <q-page class="row justify-evenly">
    <OrderInfo :order="order" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IOrdersResponse } from '../components/models';
import {api} from '../boot/axios'
import { useQuasar } from 'quasar';
import {AxiosError, AxiosResponse} from 'axios'
import {errorFunc} from '../utils/errorFunc'
import OrderInfo from '../components/MainPage/OrderInfo.vue'


export default defineComponent({
  name: 'Order',

  components: {
    OrderInfo
  },

  setup() {

    const $q = useQuasar();
    const route = useRoute()
    const order = ref()

    const getOrder = async () => {
      const { data }: { data: IOrdersResponse | null } = await api.get(
        `/api/v1/order/find-by-contract/${route.params.id as string }`
      );
      return data;
    };

    onMounted(() => {
      getOrder()
        .then((res) => {
          order.value = res;
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

    return {};
  },
});
</script>
