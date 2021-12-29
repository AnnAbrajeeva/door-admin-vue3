<template>
  <div style="margin-top: 25px">
    <div class="wrapper">
      <q-select
        style="width: 150%"
        class="input"
        label="Дверь"
        outlined
        v-model="selectDoor"
        :options="doors"
        option-value="name"
        option-label="name"
        option-disable="inactive"
        map-options
      />

      <q-input
        style="width: 100%"
        class="input"
        type="number"
        outlined
        :rules="[(val) => (val !== null && val !== '') || 'Введите количество']"
        v-model="count"
        @change="setCount"
        label="Количество"
      />
    </div>

    <div class="wrapper">
      <q-input
        class="input"
        style="width: inherit"
        type="number"
        :rules="[(val) => (val !== null && val !== '') || 'Введите высоту']"
        outlined
        @change="setHeight"
        v-model="height"
        label="Длина"
      />

      <q-input
        class="input"
        style="width: inherit"
        type="number"
        outlined
        @change="setWidth"
        v-model="width"
        :rules="[(val) => (val !== null && val !== '') || 'Введите ширину']"
        label="Ширина"
      />

      <q-input
        class="input"
        style="width: inherit"
        type="number"
        v-model="getSquare"
        outlined
        readonly
        label="Площадь"
      />

      <q-input
        class="input"
        style="width: inherit"
        type="number"
        v-model="getTotal"
        outlined
        readonly
        label="Цена"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { ErrorData, IDoor } from '../../components/models';
import { api } from '../../boot/axios';
import { useQuasar } from 'quasar';
import { AxiosError } from 'axios';
import { useStore } from '../../store/index';

export default defineComponent({
  setup() {
    const doors = ref();
    const $q = useQuasar();
    const store = useStore();

    const selectDoor = ref({
      id: '',
      name: '',
      price: '',
      status: false,
    });
    const count = ref();
    const width = ref();
    const height = ref();

    async function getDoors() {
      try {
        const { data }: { data: IDoor[] | null } = await api.get(
          '/api/v1/door'
        );
        doors.value = data;
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

    void getDoors();

    watch(
      () => selectDoor.value,
      (currentValue) => {
        void store.commit('order/setDoor', currentValue);
      }
    );

    const setCount = (count: number) => {
      store.commit('order/setCount', count);
    };

    const setHeight = (height: number) => {
      store.commit('order/setHeight', height);
    };

    const setWidth = (width: number) => {
      store.commit('order/setWidth', width);
    };

    const getSquare = computed(() => {
      let square = width.value * height.value * count.value;
       if(isNaN(square)) {
        return 0
      } else {
        return square
      }
    });

    const getTotal = computed(() => {
      let total = getSquare.value * Number(selectDoor.value.price);
      if(isNaN(total)) {
        return 0
      } else {
        return total
      }
    });


    watch(() => getSquare.value, (currentValue) => {
        void store.commit('order/setDoorSquare', currentValue);
      }
    );
   
   watch(() => getTotal.value, (currentValue) => {
        void store.commit('order/setDoorTotal', currentValue);
      }
    );

    return {
      doors,
      selectDoor,
      count,
      width,
      height,
      setCount,
      setHeight,
      setWidth,
      getSquare,
      getTotal,
    };
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  padding: 0 20px;
}
.input {
  margin-right: 24px;
}
@media (max-width: 1023px) {
  .wrapper {
    flex-flow: wrap;
  }
  .input {
    margin-right: 0 !important;
    margin-bottom: 24px;
  }
}
</style>
