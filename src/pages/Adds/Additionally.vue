<template>
  <div class="q-pa-md fit">
    <q-table
      title="Дополнительно"
      :rows="adds"
      :columns="columns"
      row-key="name"
      :dense="$q.screen.lt.md"
      separator="cell"
      table-header-class="header"
      :table-header-style="{ backgroundColor: 'rgb(219 219 219)' }"
      no-data-label="Список пуст"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Создать"
          no-caps
          @click="this.$router.push('/reference/additionally/new')"
        />
      </template>

      <template #body-cell-status="props">
        <q-td :props="props">
          <q-chip
            :color="props.row.status === true ? 'green' : 'red'"
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.status === true ? 'Включен' : 'Отключен' }}</q-chip
          >
        </q-td>
      </template>

      <template #body-cell-type="props">
        <q-td :props="props">
          {{ convertType(props.row.type) }}
        </q-td>
      </template>

      <template v-slot:body-cell-action="row">
        <q-td :style="{ width: '300px' }" :props="row">
          <q-btn
            class="q-ma-md"
            dense
            round
            flat
            color="blue"
            @click="editAdd(row.row)"
            icon="edit"
          ></q-btn>
          <q-btn
            class="q-ma-md"
            dense
            round
            flat
            color="grey"
            @click="deleteAdd(row.row)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from '../../boot/axios';
import { IAdditionParams, ErrorData } from '../../components/models';
import { AxiosError } from 'axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Doors',

  setup() {
    const adds = ref<IAdditionParams[] | null>();
    const $q = useQuasar();
    const router = useRouter();

    async function getAdds() {
      try {
        const { data }: { data: IAdditionParams[] | null } = await api.get(
          '/api/v1/additionally'
        );
        adds.value = data;
        $q.loading.hide();
      } catch (error) {
       const { response } = error as AxiosError;
          if (response && response.data) {
            const err = response.data as ErrorData;
            $q.loading.hide();
            $q.notify({
              type: 'negative',
              message: `${err.title}`,
            });
          }
      }
    }

    void getAdds();

    const columns = [
      {
        name: 'name',
        label: 'Наименование',
        align: 'center',
        field: 'name',
        sortable: true,
      },
      {
        name: 'price',
        label: 'Цена',
        align: 'center',
        field: 'price',
        sortable: true,
      },
      {
        name: 'type',
        label: 'Тип',
        align: 'center',
        field: 'type',
        sortable: true,
      },
      {
        name: 'status',
        label: 'Статус',
        align: 'center',
        field: 'status',
        sortable: true,
      },
      {
        name: 'action',
        label: 'Действие',
        align: 'center',
        field: 'action',
        sortable: true,
      },
    ];

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
    };

    async function editAdd(item: IAdditionParams) {
      await router.push({
        name: 'AdditionallyEdit',
        params: {
          id: item.id,
        },
      });
    }

    const deleteAdd = async (item: IAdditionParams): Promise<void> => {
      await api
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .delete(`/api/v1/additionally/${item.id}`)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: 'Дополнение удалено',
          });
          $q.loading.hide();
          void getAdds();
        })
        .catch((error) => {
          const { response } = error as AxiosError;
          if (response && response.data) {
            const err = response.data as ErrorData;
            $q.loading.hide();
            $q.notify({
              type: 'negative',
              message: `${err.title}`,
            });
          }
        });
    };

    return {
      columns,
      adds,
      convertType,
      deleteAdd,
      editAdd,
    };
  },
});
</script>
