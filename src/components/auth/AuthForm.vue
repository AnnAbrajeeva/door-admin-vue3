<template>
  <q-form greedy @submit="onSubmit" class="q-gutter-md auth-form">
    <q-input
      filled
      v-model="loginForm.username"
      label="Логин *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Пожалуйста введите логин']"
    />

    <q-input
      filled
      v-model="loginForm.password"
      label="Пароль *"
      lazy-rules
      :rules="[
        (val) => (val !== null && val !== '') || 'Пожалуйста введите логин',
      ]"
    />

    <div>
      <q-btn class="fit" label="Войти" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import {AuthForm} from '../../components/models'
import {useStore} from '../../store/index'
import {useRouter} from 'vue-router';
import {errorFunc} from '../../utils/errorFunc'
import { useQuasar } from 'quasar';


export default defineComponent({
  setup() {
    const loginForm: Ref<AuthForm> = ref({
      username: '',
      password: '',
    });
     
    const $q = useQuasar();
    const store = useStore()
    const router = useRouter()

    async function onSubmit() {
      try {
        await store.dispatch('auth/login', loginForm.value)
        await router.push('/') 
      } catch (error) {
        let err = errorFunc(error as number);
         $q.loading.hide();
            $q.notify({
              type: 'negative',
              message: `${err}`,
            })
          }
      }       
    
    return {
      loginForm,
      onSubmit
    };
  },
});
</script>


<style scoped>

</style>