<template>
  <div v-if="order.doors.length" class="q-pa-md fit">
    <h6 class="mb-5 mt-10 text-weight-bold">Дверь</h6>

    <div v-for="door in order.doors" class="wrapper q-pa-md" :key="door.id">
    <q-list style="width: 100%" bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>
            <q-item-label>Название</q-item-label>
            <q-item-label caption>{{ door.name }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Длина</q-item-label>
          <q-item-label caption>{{ door.length }} м.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Цена</q-item-label>
          <q-item-label caption>{{ door.price }} сум</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

     <q-list style="width: 100%" bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>
            <q-item-label>Ширина</q-item-label>
            <q-item-label caption>{{ door.width }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Итого</q-item-label>
          <q-item-label caption>{{ door.total }} сум</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Площадь</q-item-label>
          <q-item-label caption>{{ door.square }} м<sup>2</sup></q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

   <h6 class="mb-5 mt-10 text-weight-bold">Дополнения</h6>

<template v-for="door in order.doors">
    <div v-for="add in door.additionally" class="wrapper q-pa-md" :key="add.addition.id">
    <q-list class="list" bordered separator>
      <q-item class="item" clickable v-ripple>
        <q-item-section >
            <q-item-label>Название</q-item-label>
            <q-item-label>{{ add.addition.name }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="item" v-if="add.length" clickable v-ripple>
        <q-item-section >
          <q-item-label>Длина</q-item-label>
          <q-item-label >{{ add.length }} м.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="item" v-if="add.deep" clickable v-ripple>
        <q-item-section>
          <q-item-label overline>Глубина</q-item-label>
          <q-item-label >{{ add.deep }}</q-item-label>
        </q-item-section>
      </q-item>

        <q-item class="item" v-if="add.piece" clickable v-ripple>
        <q-item-section>
          <q-item-label overline>Количество</q-item-label>
          <q-item-label >{{ add.piece }}</q-item-label>
        </q-item-section>
      </q-item>

        <q-item class="item" v-if="add.square" clickable v-ripple>
        <q-item-section>
          <q-item-label overline>Площадь</q-item-label>
          <q-item-label >{{ add.square }}</q-item-label>
        </q-item-section>
      </q-item>

       <q-item class="item" v-if="add.total" clickable v-ripple>
        <q-item-section>
          <q-item-label overline>Итого</q-item-label>
          <q-item-label >{{ add.total }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

  </div>
  </template>     
           
      

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IOrderStore } from '../models';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
// import { useStore } from '../../store/index';


export default defineComponent({

  setup() {

    const { useState } = createNamespacedHelpers<IOrderStore>('order');
    const { order } = useState(['order']);
 

   

    return {
      order
    };
  },
});
</script>

<style scoped>
.title-cell {
  background-color: rgb(238, 235, 235);
}
.wrapper {
    display: flex;
    width: 100%;
}
.list {
    display: flex;
    width: 100%;
}
.item {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.12) !important;
}
</style>
