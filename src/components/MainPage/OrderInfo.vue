<template>
  <div class="q-pa-md">
      {{order}}
    <q-card title="Treats" row-key="name">
         <template v-slot:body>
        <tbody>
            <tr :headers-length="6">
              <td>Заявка</td>
              <td>#{{ order.contractId }}</td>
              <td>Клиент</td>
              <td>{{ order.clientName }}</td>
              <td>Итого</td>
              <td>{{ order.price }}</td>
            </tr>
            <tr>
              <td>Создан</td>
              <td>{{ order.createdDate }}</td>
              <td>Телефон</td>
              <td>{{ order.clientPhone }}</td>
              <td>Срок</td>
              <td>
                <span v-if="order.periodDate"
                  >{{ order.periodDate[0].split("-").reverse().join(".") }} -
                  {{ order.periodDate[1].split("-").reverse().join(".") }}</span
                >
              </td>
            </tr>
            <tr>
              <td>Дополнительная стоимость</td>
              <td colspan="5">{{ order.customPrice }} сум</td>
            </tr>
          </tbody>
      </template>

        <!-- <template>
          <h4 class="mb-5">Заказ #{{ order.contractId }}</h4>
          <tbody>
            <tr :headers-length="6">
              <td>Заявка</td>
              <td>#{{ order.contractId }}</td>
              <td>Клиент</td>
              <td>{{ order.clientName }}</td>
              <td>Итого</td>
              <td>{{ order.price }}</td>
            </tr>
            <tr>
              <td>Создан</td>
              <td>{{ order.createdDate }}</td>
              <td>Телефон</td>
              <td>{{ order.clientPhone }}</td>
              <td>Срок</td>
              <td>
                <span v-if="order.periodDate"
                  >{{ order.periodDate[0].split("-").reverse().join(".") }} -
                  {{ order.periodDate[1].split("-").reverse().join(".") }}</span
                >
              </td>
            </tr>
            <tr>
              <td>Дополнительная стоимость</td>
              <td colspan="5">{{ order.customPrice }} сум</td>
            </tr>
          </tbody>
        </template> -->
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'



export default defineComponent({
    props: ['order']
    // setup() {
        
    // },
})
</script>
