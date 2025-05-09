<template>
  <div class="home">
    <h1>Список задач</h1>
    <TodoFilters />
    <ul class="task-list">
      <TodoItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @edit="editTask"
        @update="updateTask"
        @delete="deleteTask(task.id)"
      />
    </ul>
    <div class="buttons">
      <button @click="openModal">Добавить задачу</button>
      <button @click="clearCompleted">Удалить выполненные</button>
    </div>
    <TodoModal
      v-if="showModal"
      :task="selectedTask"
      @close="closeModal"
      @save="saveTask"
    />
  </div>
</template>

<script>
import TodoItem from "../components/TodoItem.vue";
import TodoModal from "../components/TodoModal.vue";
import TodoFilters from "../components/TodoFilters.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    TodoItem,
    TodoModal,
    TodoFilters,
  },
  data() {
    return {
      showModal: false,
      selectedTask: null,
    };
  },
  computed: {
    ...mapState(["tasks", "filter", "search"]),
    filteredTasks() {
      return this.tasks
        .filter((task) =>
          task.title.toLowerCase().includes(this.search.toLowerCase())
        )
        .filter((task) => {
          if (this.filter === "active") return !task.completed;
          if (this.filter === "completed") return task.completed;
          return true;
        });
    },
  },
  methods: {
    ...mapActions([
      "addTask",
      "updateTask",
      "deleteTask",
      "clearCompleted",
      "fetchTasks",
    ]),
    openModal() {
      this.selectedTask = { title: "", completed: false };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedTask = null;
    },
    saveTask(task) {
      if (task.id) {
        this.updateTask(task);
      } else {
        this.addTask({ ...task, id: Date.now(), createdAt: new Date() });
      }
      this.closeModal();
    },
    editTask(task) {
      this.selectedTask = { ...task };
      this.showModal = true;
    },
    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.task-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}
.buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
button {
  padding: 10px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #369870;
}

@media (max-width: 600px) {
  .buttons {
    flex-direction: column;
  }
  button {
    width: 100%;
  }
}
</style>
