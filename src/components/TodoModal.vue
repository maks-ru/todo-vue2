<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3>{{ (task && task.id) ? 'Редактировать' : 'Новая' }} задача</h3>
      <input v-model="localTask.title" placeholder="Введите название" />
      <div class="modal-actions">
        <button @click="$emit('close')">Отмена</button>
        <button @click="save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      localTask: { ...this.task } || { title: '' },
    };
  },
  watch: {
    task: {
      immediate: true,
      handler(val) {
        this.localTask = { ...val } || { title: '' };
      },
    },
  },
  methods: {
    save() {
      if (!this.localTask.title.trim()) {
        alert('Название не должно быть пустым');
        return;
      }
      this.$emit('save', this.localTask);
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 90%;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}
.modal input {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
