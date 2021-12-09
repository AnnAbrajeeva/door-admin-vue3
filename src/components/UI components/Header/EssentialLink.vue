<template>
  <q-item
    clickable
    tag="a"
    :href="link.link"
  >
    <q-item-section
      class="link-icons"
      v-if="link.icon"
      avatar
    >
      <q-icon :name="link.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ link.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {HeaderLinks} from '../../models'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    link: {
      required: true,
      type: Object as PropType<HeaderLinks>
    }
  },
})
</script>

<style scoped>
.link-icons {
  min-width: 30px;
}
</style>
