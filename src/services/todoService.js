
export default class ToDoService {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    async save(task) {
        this.tasks.push(task);
        this.updateLocalStorage();
        return task;
    }

    async completeTask(index) {
        this.tasks[index].status = 'completed';
        this.updateLocalStorage();
    }

    async deleteTask(index) {
        this.tasks.splice(index, 1);
        this.updateLocalStorage();
    }

    async getAllTasks() {
        return this.tasks;
    }

    updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}
