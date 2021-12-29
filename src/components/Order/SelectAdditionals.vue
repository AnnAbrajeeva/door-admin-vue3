<template>
  <div class="q-pa-md row wrap justify-between">
    <div style="width: 100%" class="row" v-for="add in door.additionally" :key="add.id">
        <h6 class="add-title">{{add.addition.name}}</h6>
      <component 
      v-if="add"
      :add="add"
      :is="componentName(add.addition.type)+'Edit'"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IStore } from '../models';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import TransomsEdit from './Adds/Transoms/TransomsEdit.vue';
import CastleEdit from './Adds/Castle/CastleEdit.vue';
import CorniceEdit from './Adds/Cornice/CorniceEdit.vue';
import CubeEdit from './Adds/Cube/CubeEdit.vue';
import PimpernelEdit from './Adds/Pimpernel/PimpernelEdit.vue';
import PlatbandEdit from './Adds/Platband/PlatbandEdit.vue';

export default defineComponent({
  components: {
    TransomsEdit,
    CastleEdit,
    CorniceEdit,
    CubeEdit,
    PimpernelEdit,
    PlatbandEdit
  },
  setup() {
    const { useState } = createNamespacedHelpers<IStore>('order');
    const { door } = useState(['door']);

    const componentName = (name: string) => {
        if(name) {
            name = name.toLowerCase();
            return String(name.charAt(0).toUpperCase()) + String(name.slice(1));
        } 
    };

    return {
      componentName,
      door,
    };
  },
});
</script>

<style scoped>
.add-title {
    margin: 0;
}
</style>
