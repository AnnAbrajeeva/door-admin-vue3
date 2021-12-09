<template>
  <q-header class="glossy header" elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
        class="lt-md"
      />
      <EssentialLink
        class="gt-sm"
        v-for="link in linksList"
        :key="link.title"
        :link="link"
      />
      <q-btn class="btn-logout" @click="logout" icon="logout" label="Выйти" />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, PropType } from 'vue';
import { useStore } from '../../../store/index';
import EssentialLink from './EssentialLink.vue';
import { HeaderLinks } from '../../models';
import {useRouter} from 'vue-router'

export default defineComponent({
  emits: ['toggleLeftDrawer'],

  props: {
    linksList: {
      required: true,
      type: Array as PropType<HeaderLinks[]>,
    },
  },

  components: {
    EssentialLink,
  },

  setup(_, context: SetupContext) {
    const store = useStore();
    const router = useRouter()

    const activeLink = ref('one');

    function toggleLeftDrawer(): void {
      context.emit('toggleLeftDrawer');
    }

    function logout() {
      void store.commit('auth/logout');
      void router.push('/auth')
    }

    return {
      toggleLeftDrawer,
      activeLink,
      logout,
    };
  },
});
</script>


<style scoped>
.btn-logout {
  margin-left: auto;
}
</style>