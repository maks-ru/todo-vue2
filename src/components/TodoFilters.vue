<template>
  <div class="filters">
    <input v-model="search" @input="updateSearch" placeholder="Поиск задач..." />
    <select v-model="filter" @change="updateFilter">
      <option value="all">Все</option>
      <option value="active">Активные</option>
      <option value="completed">Выполненные</option>
    </select>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState(['filter', 'search']),
  },
  methods: {
    ...mapMutations(['setFilter', 'setSearch']),
    updateFilter(e) {
      this.setFilter(e.target.value);
    },
    updateSearch(e) {
      this.setSearch(e.target.value);
    },
  },
};
</script>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

input, select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

@media (max-width: 600px) {
  .filters {
    flex-direction: column;
  }
}
</style>
