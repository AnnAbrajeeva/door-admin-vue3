<template>
  <div class="q-pa-md wrapper">
    <q-select
      style="width: inherit"
      class="door-select q-mr-lg"
      label="Дополнительные параметры"
      outlined
      v-model="selectAdd"
      :options="adds"
      option-value="name"
      option-label="name"
      option-disable="inactive"
      map-options
      nput-debounce="0"
      use-input
    />

    <ModalAddAddition :selectAdd="selectAdd" @clearAddition="clearAddition" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import { IAdditionParams, ErrorData } from '../models';
import { api } from '../../boot/axios';
import { AxiosError } from 'axios';
import { useQuasar } from 'quasar';
import { useStore } from '../../store/index';
import ModalAddAddition from './ModalAddAddition.vue';

export default defineComponent({
  components: {
    ModalAddAddition,
  },

  setup() {
    const adds = ref() as Ref<IAdditionParams[] | null>;
    const $q = useQuasar();
    const selectAdd = ref() as Ref<IAdditionParams | null>;
    const store = useStore();

    async function getAdds() {
      try {
        const { data }: { data: IAdditionParams[] | null } = await api.get(
          '/api/v1/additionally'
        );
        adds.value = data;
        $q.loading.hide();
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
    }

    void getAdds();
    if (selectAdd) {
      watch(
        () => selectAdd.value,
        (currentValue) => {
          void store.commit('order/setAdd', currentValue);
        }
      );
    }

    const clearAddition = () => {
      selectAdd.value = null;
    };

    return {
      selectAdd,
      adds,
      clearAddition,
    };
  },
});
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
}
</style>
