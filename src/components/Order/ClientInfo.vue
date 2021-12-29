/* eslint-disable @typescript-eslint/no-unused-vars */
<template>
  <div class="q-pa-md wrap wrapper">
    <q-input
     class="q-mr-lg"
      style="width: inherit"
      outlined
      v-model="clientInfo.name"
      label="Клиент"
      lazy-rules
      @change="setName"
      :rules="[(val) => (val && val.length > 0) || 'Введите имя клиента']"
    />

    <q-input
     class="q-mr-lg"
      style="width: inherit"
      outlined
      type="tel"
      v-model="clientInfo.phone"
      label="Телефон"
      mask="+### (##) ### - ## - ##"
      lazy-rules
      @change="setPhone"
      :rules="[(val) => (val !== null && val !== '') || 'Введите телефон']"
    />

    <q-input
     class="q-mr-lg"
      style="width: inherit"
      outlined
      v-model="clientInfo.date"
      mask="date"
      :rules="[(val) => (val !== null && val !== '') || 'Введите дату']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="clientInfo.date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input
     class="q-mr-lg"
      style="width: inherit"
      label="Начальная дата"
      outlined
      v-model="clientInfo.periodDate.from"
      :rules="[(val) => (val !== null && val !== '') || 'Введите дату']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date range v-model="clientInfo.periodDate">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input class="q-mr-lg" style="width: inherit" readonly label="Конечная дата" outlined v-model="clientInfo.periodDate.to">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer"> </q-icon>
      </template>
    </q-input>

    <q-input class="q-mr-lg" style="width: inherit" readonly outlined v-model="getCustomPrice" label="Итого" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { useStore } from '../../store/index';
import {IStore} from '../models'

export default defineComponent({
  setup() {
    const clientInfo = ref({
      name: '',
      phone: '',
      date: '',
      periodDate: {},
      customPrice: '',
    });
    const store = useStore();
     const { useState } = createNamespacedHelpers<IStore>('order');
    const { order } = useState(['order']);

    const setName = (name: string) => {
      void store.commit('order/setName', name);
    };

    const setPhone = (phone: string) => {
      void store.commit('order/setPhone', phone);
    };

    const getCustomPrice = computed(() => {
      let doorPrice = order.value.doors.map(door => {
        let total = 0;
        if(door.total) {
          total += door.total
          return total
        }  
      })
      let addPrice = order.value.doors.map(door => {
        let total = 0;
        door.additionally.map(add => {
          if(add.total) {
             total += add.total
          }
        })
        return total
      })
      return Number(doorPrice) + Number(addPrice)
    })

    watch(
      () => clientInfo.value.date,
      (currentValue) => {
        void store.commit('order/setDate', currentValue);
      }
    );

    watch(() => clientInfo.value.periodDate, (currentValue) => {
        void store.commit('order/setRangeDate', currentValue)
    })

     watch(() => getCustomPrice.value, (currentValue) => {
        void store.commit('order/setSummaryTotal', currentValue)
    })

    return {
      clientInfo,
      setName,
      setPhone,
      getCustomPrice
    };
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  flex-flow: row;
}

@media (max-width: 1023px) {
  .wrapper {
    flex-flow: wrap;
  }
}

</style>
