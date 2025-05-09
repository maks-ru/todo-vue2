<template>
  <li class="todo-item" :class="{ completed: task.completed }">
    <div class="content">
      <input
        type="checkbox"
        v-model="task.completed"
        @change="$emit('update', task)"
      />
      <span>{{ task.title }}</span>
    </div>
    <div class="actions">
      <button @click="$emit('edit', task)">✏️</button>
      <button @click="$emit('delete')">🗑️</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      localCompleted: this.task.completed,
    };
  },
  watch: {
    task: {
      handler(newVal) {
        this.localCompleted = newVal.completed;
      },
      deep: true,
    },
  },
  methods: {
    toggle() {
      this.$emit("edit", { ...this.task, completed: this.localCompleted });
    },
  },
};
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.completed span {
  text-decoration: line-through;
  color: gray;
}
.content {
  display: flex;
  align-items: center;
  gap: 10px;
}
.actions button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

@media (max-width: 600px) {
  .todo-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .actions {
    margin-top: 8px;
  }
}
</style>
