<template>
  <div>
    <q-btn
      style="width: 100%"
      label="Добавить"
      color="black"
      class="center"
      glossy
      :disabled="!selectAdd"
      @click="medium = true"
    />

    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-form @submit="onSubmit">
          <q-card-section>
            <component 
            :selectAdd="addition" 
            :is="componentName(addition.addition.type)"></component>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn type="submit" flat label="OK"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '../../store/index';
import { IOrderStore } from '../models';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import Transoms from './Adds/Transoms/Transoms.vue';
import Castle from './Adds/Castle/Castle.vue';
import Cornice from './Adds/Cornice/Cornice.vue';
import Cube from './Adds/Cube/Cube.vue';
import Pimpernel from './Adds/Pimpernel/Pimpernel.vue';
import Platband from './Adds/Platband/Platband.vue';

export default defineComponent({
  components: {
    Transoms,
    Castle,
    Cornice,
    Cube,
    Pimpernel,
    Platband
  },
  
  props: ['selectAdd'],

  setup(_, {emit}) {
    const medium = ref(false);
    const deepValue = ref();
    const store = useStore();
    const { useState } = createNamespacedHelpers<IOrderStore>('order');
    const { addition } = useState(['addition']);

    const componentName = (name: string) => {
        if(name) {
            name = name.toLowerCase();
            return String(name.charAt(0).toUpperCase()) + String(name.slice(1));
        } 
    };


    const onSubmit = async () => {
      await store.dispatch('order/addAddition')
      medium.value = false
      emit('clearAddition')
    }

    return {
      medium,
      deepValue,
      onSubmit,
      componentName,
      addition
    };
  },
});
</script>

<style scoped>
.center {
  height: 100%;
}
</style>
