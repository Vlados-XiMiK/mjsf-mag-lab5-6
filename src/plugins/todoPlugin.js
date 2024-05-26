
import ToDoService from '../services/todoService';

export default {
    install(Vue) {
        const todoService = new ToDoService();
        Vue.prototype.$services = {
            todo: todoService
        };
    }
};
