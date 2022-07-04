import { Todo } from '../models/todo';
import { defineStore } from 'pinia'
import { getCurrentDateTime, getCurrentDateWithoutTime } from '../helpers/date';

export const useTodos = defineStore('todos', {
  state: () => {
    return {
      todos: [] as Todo[],
      awaitingTodosCount: 0,
      doneTodosCount: 0,
      deadlineTodosCount: 0,
    }
  },
  actions: {
    addTodo(todo: Todo) {
      todo.id = this.getNextId();
      todo.done = false;
      todo.created = getCurrentDateTime();
      this.todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.sortTodos();
    },
    sortTodos() {
      this.todos = this.todos.sort((a, b) => {
        if (b.deadline >= a.deadline) {
          return -1;
        } else if (b.deadline < a.deadline) {
          return 1
        } else {
          return 0
        }
      })
    },
    getNextId() {
      if (this.todos.length < 1) {
        return 1;
      }
      return this.todos.sort((a, b) => {
        return a.id - b.id;
      })[this.todos.length - 1].id + 1;
    },
    getTodosCounts() {
      this.getAwaitingTodosCount();
      this.getDoneTodosCount();
      this.getDeadlineTodosCount();
    },
    getDeadlineTodosCount() {
      this.deadlineTodosCount = this.todos.filter((item) => {
        return getCurrentDateWithoutTime() >= item.deadline && !item.done
      }).length;
    },
    getAwaitingTodosCount() {
      this.awaitingTodosCount = this.todos.filter((item) => {
        return !item.done;
      }).length;
    },
    getDoneTodosCount() {
      this.doneTodosCount = this.todos.filter((item) => {
        return item.done;
      }).length;
    },
    markDone(id: number) {
      const todo = this.todos.find(x => x.id == id);
      if (todo) {
        todo.done = true;
        todo.completed = getCurrentDateTime();
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.getTodosCounts();
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
      this.getTodosCounts();
    },
    getTodos() {
      const localStorageTodos = localStorage.getItem('todos');
      if (localStorageTodos) {
        this.todos = JSON.parse(localStorageTodos);
        this.sortTodos();
        this.getTodosCounts();
      }
    }
  },
})