<template>
  <div class="q-pa-md fit">
    <q-table
      title="Список дверей"
      :rows="doors"
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
          @click="this.$router.push('/reference/door/new')"
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

      <template v-slot:body-cell-action="row">
        <q-td :style="{ width: '300px' }" :props="row">
          <q-btn
            class="q-ma-md"
            dense
            round
            flat
            color="blue"
            @click="editDoor(row.row)"
            icon="edit"
          ></q-btn>
          <q-btn
            class="q-ma-md"
            dense
            round
            flat
            color="grey"
            @click="deleteDoor(row.row)"
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
import { IDoors, IDoor, ErrorData } from '../../components/models';
import { AxiosError } from 'axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Doors',

  setup() {
    const doors = ref<IDoors[] | null>();
    const $q = useQuasar();
    const router = useRouter();

    async function getDoors() {
      try {
        const { data }: { data: IDoors[] | null } = await api.get(
          '/api/v1/door'
        );
        doors.value = data;
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

    void getDoors();

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

    async function editDoor(item: IDoor) {
      await router.push({
        name: 'DoorEdit',
        params: {
          id: item.id,
        },
      });
    }

    async function deleteDoor(item: IDoor) {
      try {
        await api.delete(`/api/v1/door/${item.id}`);
        $q.notify({
          type: 'positive',
          message: 'Дверь удалена',
        });
        $q.loading.hide();
        void getDoors()
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

    return {
      columns,
      doors,
      deleteDoor,
      editDoor,
    };
  },
});
</script>
