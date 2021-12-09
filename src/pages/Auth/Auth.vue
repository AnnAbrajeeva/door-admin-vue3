<template>
  <q-card class="my-card fixed-center">
    <q-card-section> 
        <AuthForm />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthForm from '../../components/auth/AuthForm.vue'

export default defineComponent({



  components: {
    AuthForm
  },

  // setup() {
    
  // },
})
</script>

<style scoped>
.my-card {
  width: 80%;
  max-width: 500px;
}
</style>
