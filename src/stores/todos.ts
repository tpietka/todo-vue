import { Todo } from '../models/todo';
import { defineStore } from 'pinia'
import { getCurrentDateTime } from '../helpers/date';

export const useTodos = defineStore('todos', {
    state: () => {
        return {
            todos: [] as Todo[],
        }
    },
    actions: {
        addTodo(todo: Todo) {
            todo.id = this.todos.length + 1;
            todo.created = getCurrentDateTime();
            this.todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        markDone(id: number) {
            const todo = this.todos.find(x => x.id == id);
            if (todo) {
                todo.done = true;
                todo.completed = getCurrentDateTime();
            }
            localStorage.setItem('todos', JSON.stringify(this.todos));

        },
        markUndone(id: number) {
            const todo = this.todos.find(x => x.id == id);
            if (todo) {
                todo.done = false;
                todo.completed = '';
            }
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deleteTodo(id: number) {
            this.todos = this.todos.filter(item => {
                return item.id != id;
            })
            localStorage.setItem('todos', JSON.stringify(this.todos));

        },
        getTodos() {
            const localStorageTodos = localStorage.getItem('todos');
            if (localStorageTodos) {
                this.todos = JSON.parse(localStorageTodos);
            }
        }
    },
})