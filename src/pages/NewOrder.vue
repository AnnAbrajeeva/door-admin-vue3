<template>
  <div class="q-pa-md fit">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <ClientInfo />
      <CreateOrderModal />

    <q-btn
        type="submit"
        class="q-ma-md btn-order"
        color="primary"
        icon="library_add"
        label="Создать заказ"
      />
    </q-form>
    <DoorShow />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import ClientInfo from '../components/Order/ClientInfo.vue';
import CreateOrderModal from '../components/Order/CreateOrderModal.vue';
import { AxiosError } from 'axios';
import {useStore} from '../store/index'
import { useQuasar } from 'quasar';
import { ErrorData } from '../components/models';
import DoorShow from '../components/Order/DoorShow.vue'
import {useRouter} from 'vue-router'


export default defineComponent({
  components: {
    ClientInfo,
    CreateOrderModal,
    DoorShow
  },

  setup() {
    const createModal: Ref<boolean> = ref(false);
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter()

    const onSubmit = async () => {
      try {
        await store.dispatch('order/addOrder');
        $q.loading.hide();
        void router.push('/')
      } catch (error) {
        const { response } = error as AxiosError;
        if (response && response.data) {
          const err = response.data as ErrorData;
          $q.loading.hide();
          $q.notify({
            type: 'negative',
            message: `${err.title}`,
          });
        }
      }
    };

    return {
      createModal,
      onSubmit
    };
  },
});
</script>


