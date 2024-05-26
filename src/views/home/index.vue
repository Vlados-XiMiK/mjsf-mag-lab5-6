
<template>
  <div class="todo">
    <div class="card text-left">
      <div class="card-header">
        ToDo Component
      </div>
      <div class="card-body">
        <h5 class="card-title">My tasks</h5>
        <div class="card-text">
          <form @submit.prevent="submit">
            <div class="form-group">
              <label for="task-title">Task title</label>
              <input v-model="model.title" type="text" class="form-control" id="task-title" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
              <label for="task-desc">Task description</label>
              <textarea v-model="model.description" class="form-control" id="task-desc"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="!isValid">Submit</button>
          </form>

          <ul class="pt-3">
            <li v-for="(item, index) in filteredTaskList" :key="index" class="d-flex justify-content-between mb-3">
              <div>
                <h4 v-if="item.status === 'completed'"><s>{{item.title}}</s></h4>
                <h4 v-else>{{item.title}}</h4>
                <p>{{item.description}}</p>
              </div>
              <div>
                <button class="btn btn-primary mr-2" @click="completeTask(index)" v-if="item.status !== 'completed'">Complete</button>
                <button class="btn btn-danger" @click="deleteTask(index)">Delete</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="card-footer">
          <button class="btn" :class="{'btn-primary':!filterStatus}" @click="filterStatus = ''">All</button>
          <button class="btn" :class="{'btn-primary': filterStatus === 'completed'}" @click="filterStatus = 'completed'">Completed</button>
          <button class="btn" :class="{'btn-primary': filterStatus === 'incompleted'}" @click="filterStatus = 'incompleted'">InCompleted</button>
          Active tasks count: {{ taskList.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Task } from '../../models/task';

export default {
  name: "ToDo",
  data: () => ({
    model: new Task(),
    taskList: [],
    filterStatus: "",
    loading: false,
  }),
  async mounted() {
    this.loading = true;
    this.taskList = await this.$services.todo.getAllTasks();
    this.loading = false;
  },
  methods: {
    async submit() {
      if (!this.isValid) return;

      const res = await this.$services.todo.save(this.model);
      if (res) { // Проверяем успешное сохранение
        this.taskList.push(res); // Добавляем только одну задачу
        this.model = new Task(); // Очищаем модель для следующей задачи
      }
    }
    ,
    async save(task) {
      // Логика сохранения задачи
      this.tasks.push(task);
      this.updateLocalStorage();
      return task; // Возвращаем сохраненную задачу
    }
    ,
    async completeTask(index) {
      await this.$services.todo.completeTask(index);
      this.$set(this.taskList[index], 'status', 'completed');
    },
    async deleteTask(index) {
      await this.$services.todo.deleteTask(index);
      this.taskList.splice(index, 1);
    }
  },
  computed: {
    isValid() {
      return this.model.title && this.model.description;
    },
    filteredTaskList() {
      return this.taskList.filter((item) => {
        if (!this.filterStatus) return true;
        return item.status === this.filterStatus;
      });
    }
  }
}
</script>

<style scoped>
.todo {
  background-color: aqua;
}
</style>
