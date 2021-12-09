<template>
  <q-layout view="lHh Lpr lFf">
    <Header :linksList="linksList" @toggleLeftDrawer="toggleLeftDrawer" />
    
    <Drawer :linksList="linksList" :leftDrawerOpen="leftDrawerOpen" />
  
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Header from '../components/UI components/Header/Header.vue'
import Drawer from '../components/UI components/Header/Drawer.vue'

const linksList = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: '/'
  },
  {
    title: 'Заказ',
    icon: 'add_circle',
    link: '/new'
  },
  {
    title: 'Справочники',
    icon: 'book',
    link: '/reference'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Header,
    Drawer
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      linksList: linksList,
      leftDrawerOpen,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style scoped>
.header {
  background-color: #424040;
}
</style>