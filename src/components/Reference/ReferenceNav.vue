<template>
  <div class="q-pa-md fit">
      <h1 class="title">Навигация</h1>
    <q-list bordered separator>
      <q-item clickable :to="('/reference/door')">
        <q-item-section>Двери</q-item-section>
      </q-item>

      <q-item clickable v-ripple :to="('/reference/additionally')">
        <q-item-section>
          <q-item-label>Дополнительно</q-item-label>
        </q-item-section>
      </q-item>   
    </q-list>
  </div>
</template>

<style scoped>
.title {
    font-size: 20px;
}
</style>