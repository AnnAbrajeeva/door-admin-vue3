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
        v-model="add.name"
        label="Наименование"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Введите название двери']"
      />

      <q-select outlined v-model="add.type" :options="addsType" label="Тип" emit-value map-options />

      <q-input
        outlined
        type="number"
        v-model="add.price"
        label="Стоимость"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Введите цену']"
      />

      <q-toggle v-model="add.status" label="Статус" />

      <div>
        <q-btn label="Сохранить" type="submit" color="primary" />
        <q-btn @click="goBack" label="Отмена" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed, onMounted } from 'vue';
import { IAdditionParams, ErrorData } from '../../components/models';
import { api } from '../../boot/axios';
import { useQuasar } from 'quasar';
import { AxiosError } from 'axios';
// import { errorFunc } from '../../utils/errorFunc';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  props: {
    editDoor: {
      type: Object as PropType<IAdditionParams>,
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const myForm = ref();
    let add = ref({
      name: '',
      type: null,
      price: null,
      status: false,
    } as IAdditionParams);

      const convertType = (type: string): string => {
    if (type == 'TRANSOMS') {
      return 'Добор';
    } else if (type == 'CASTLE') {
      return 'Замок';
    } else if (type == 'CORNICE') {
      return 'Карниз';
    } else if (type == 'CUBE') {
      return 'Куб';
    } else if (type == 'PLATBAND') {
      return 'Наличник';
    } else if (type == 'PIMPERNEL') {
      return 'Сапожок';
    } else {
      return 'Дополнение';
    }
  }

    const addsType = [
        {
            label: 'Добор',
            value: 'TRANSOMS'
        },
        {
            label: 'Замок',
            value: 'CASTLE'
        },
        {
            label: 'Карниз',
            value: 'CORNICE'
        },
        {
            label: 'Кубик',
            value: 'CUBE'
        },
        {
            label: 'Наличник',
            value: 'PLATBAND'
        },
        {
            label: 'Сапожок',
            value: 'PIMPERNEL'
        },
    ]

    const viewMethod = computed(() => {
      if (route.params.id) {
        return editAdditionally;
      } else {
        return addAdditionally;
      }
    });

    onMounted(() => {
      if (route.params.id) {
        void getEditAdditionally();
      }
    });

    async function getEditAdditionally() {
      try {
        let { data }: { data: IAdditionParams } = await api.get(
          `/api/v1/additionally/${route.params.id as string}`
        );
        add.value = data;
        $q.loading.hide();
      } catch (error) {
        void router.push({ name: 'Error404' });
      }
    }

    const editAdditionally = async (): Promise<void> => {
        await api
          .put('/api/v1/additionally', add.value)
          .then(() => {
            $q.notify({
              type: 'positive',
              message: 'Данные изменены успешно',
            });
            $q.loading.hide();
            void router.push('/reference/additionally');
          })
          .catch((error) => {
            const { response } = error as AxiosError;
            if(response && response.data) {
                const err = response.data as ErrorData
                $q.loading.hide();
                $q.notify({
                type: 'negative',
                message: `${err.title}`,
                });
            }        
          });
    };

    const addAdditionally = async (): Promise<void> => {
      if (!props.editDoor) {
        await api
          .post('/api/v1/additionally', add.value)
          .then(() => {
            $q.notify({
              type: 'positive',
              message: 'Дополнение добавлено',
            });
            $q.loading.hide();
            void router.push('/reference/additionally');
          })
          .catch((error) => {
            const { response } = error as AxiosError;
            if(response && response.data) {
                const err = response.data as ErrorData
                $q.loading.hide();
                $q.notify({
                type: 'negative',
                message: `${err.title}`,
                });
            }        
          });
      }
    };

    const goBack = () => {
      void router.push('/reference/additionally')
    }

    return {
      add,
      viewMethod,
      myForm,
      goBack,
      addsType,
      convertType
    };
  },
});
</script>
