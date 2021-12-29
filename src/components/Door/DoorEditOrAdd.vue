<template>
  <div class="q-pa-md fit">
    <q-toolbar class="bg-grey-3">
      <q-toolbar-title> {{$route.params.id ? 'Редактировать' : 'Создать'}} </q-toolbar-title>
      <q-btn @click="goBack" flat round dense>
        <q-icon name="close" />
      </q-btn>
    </q-toolbar>

    <q-form @submit="viewMethod" ref="myForm" greedy class="q-gutter-md q-mt-md">
      <q-input
        outlined
        ref="nameRef"
        v-model="door.name"
        label="Наименование"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Введите название двери']"
      />

      <q-input
        outlined
        type="number"
        v-model="door.price"
        label="Стоимость"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Введите цену']"
      />

      <q-toggle v-model="door.status" label="Статус" />

      <div>
        <q-btn label="Сохранить" type="submit" color="primary" />
        <q-btn @click="goBack" label="Отмена" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed, onMounted } from 'vue';
import { IDoor } from '../../components/models';
import { api } from '../../boot/axios';
import { useQuasar } from 'quasar';
import { AxiosError, AxiosResponse } from 'axios';
import { errorFunc } from '../../utils/errorFunc';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  props: {
    editDoor: {
      type: Object as PropType<IDoor>,
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const myForm = ref();
    let door = ref({
      name: '',
      price: null,
      status: false,
    } as IDoor);

    const viewMethod = computed(() => {
      if (route.params.id) {
        return editDoor;
      } else {
        return addNewDoor;
      }
    });

    onMounted(() => {
      if (route.params.id) {
        void getEditDoor();
      }
    });

    async function getEditDoor() {
      try {
        let { data }: { data: IDoor } = await api.get(
          `/api/v1/door/${route.params.id as string}`
        );
        door.value = data;
        $q.loading.hide();
      } catch (error) {
        void router.push({ name: 'Error404' });
      }
    }

    const editDoor = async (): Promise<void> => {
        await api
          .put('/api/v1/door', door.value)
          .then(() => {
            $q.notify({
              type: 'positive',
              message: 'Данные изменены успешно',
            });
            $q.loading.hide();
            void router.push('/reference/doors');
          })
          .catch((error) => {
            const { response } = error as AxiosError;
            const { status } = response as AxiosResponse;
            let err = errorFunc(status);
            $q.loading.hide();
            $q.notify({
              type: 'negative',
              message: `${err}`,
            });
          });
    };

    const addNewDoor = async (): Promise<void> => {
      if (!props.editDoor) {
        await api
          .post('/api/v1/door', door.value)
          .then(() => {
            $q.notify({
              type: 'positive',
              message: 'Дверь добавлена',
            });
            $q.loading.hide();
            void router.push('/reference/doors');
          })
          .catch((error) => {
            const { response } = error as AxiosError;
            const { status } = response as AxiosResponse;
            let err = errorFunc(status);
            $q.loading.hide();
            $q.notify({
              type: 'negative',
              message: `${err}`,
            });
          });
      }
    };

    const goBack = () => {
      void router.push('/reference/door')
    }

    return {
      door,
      viewMethod,
      myForm,
      goBack
    };
  },
});
</script>
