<template>
  <q-drawer
    v-model="drawer"
    show-if-above 
    :breakpoint="500"
    bordered v-if="leftDrawerOpen"
     >
    <q-list>
      <q-item-label header> Меню </q-item-label>

      <EssentialLink v-for="link in linksList" :key="link.title" :link="link" />
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import EssentialLink from './EssentialLink.vue';
import {HeaderLinks} from '../../models'

export default defineComponent({
  name: 'Drawer',

   components: {
    EssentialLink
  },

  props: {
    linksList: {
        required: true,
        type: Array as PropType<HeaderLinks[]>,
      },
    leftDrawerOpen: {
      required: true,
      type: Boolean as PropType<boolean>,
    }
  },

  setup(props) {

    return {
      drawer: props.leftDrawerOpen
    }
  },
});
</script>
