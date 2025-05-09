import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    filter: "all",
    search: "",
  },
  getters: {
    filteredTasks(state) {
      let tasks = state.tasks;
      if (state.search) {
        tasks = tasks.filter((task) =>
          task.title.toLowerCase().includes(state.search.toLowerCase())
        );
      }
      if (state.filter === "active") return tasks.filter((t) => !t.completed);
      if (state.filter === "completed") return tasks.filter((t) => t.completed);
      return tasks;
    },
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.unshift(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) Vue.set(state.tasks, index, updatedTask);
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((t) => t.id !== id);
    },
    clearCompleted(state) {
      state.tasks = state.tasks.filter((t) => !t.completed);
    },
    setFilter(state, filter) {
      state.filter = filter;
    },
    setSearch(state, search) {
      state.search = search;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const tasks = data.map((t) => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
        createdAt: new Date(),
      }));
      commit("setTasks", tasks);
    },
    clearCompleted({ commit }) {
      commit("clearCompleted");
    },
    deleteTask({ commit }, id) {
      commit("deleteTask", id);
    },
    updateTask({ commit }, task) {
      commit("updateTask", task);
    },
    addTask({ commit }, task) {
      commit("addTask", task);
    },
  },
});
