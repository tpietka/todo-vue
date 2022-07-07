import { Todo } from '../models/todo';
import { defineStore } from 'pinia'
import { getCurrentDateTime, getCurrentDate, formatDateToYYYYMMDD, getTomorrowsDate } from '../helpers/date';

interface StoreState {
  todos: Todo[];
}
export const useTodos = defineStore('todos', {
  state: (): StoreState => {
    return {
      todos: [],
    }
  },
  getters: {
    doneTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return todo.done;
      })
    },
    awaitingTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return !todo.done;
      })
    },
    todayTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return getCurrentDate() >= formatDateToYYYYMMDD(todo.deadline) && !todo.done;
      })
    },
    nextDaysTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return getCurrentDate() < formatDateToYYYYMMDD(todo.deadline) && !todo.done;
      })
    },
    deadlineTodosCount(): number {
      return this.todayTodos.length;
    },
    awaitingTodosCount(): number {
      return this.awaitingTodos.length;
    },
    doneTodosCount(): number {
      return this.doneTodos.length;
    }
  },
  actions: {
    addTodo(todo: Todo): void {
      todo.id = this.getNextId();
      todo.done = false;
      todo.created = getCurrentDateTime();
      this.todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.sortTodos();
    },
    editTodo(id: number, updatedTodo: Todo): void {
      let todo = this.todos.filter(todo => {
        return todo.id === id;
      })[0];
      todo = updatedTodo;
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    getTodo(id: number): Todo {
      if (this.todos.length < 1) {
        this.getTodos();
      }
      return this.todos.filter(todo => {
        return todo.id == id;
      })[0];
    },
    moveTodo(id: number, type: string): void {
      console.log(type);
      let todo = this.todos.filter(todo => {
        return todo.id == id;
      })[0]
      if (type == 'Today') {
        todo.deadline = getCurrentDate();
        todo.done = false;
        todo.completed = '';
      } else if (type == 'Next days') {
        todo.deadline = getTomorrowsDate();
        todo.done = false;
        todo.completed = '';
      } else if (type == 'Done') {
        todo.done = true;
        todo.completed = getCurrentDate();
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.sortTodos();
    },
    sortTodos(): void {
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
    getNextId(): number {
      if (this.todos.length < 1) {
        return 1;
      }
      return this.todos.sort((a, b) => {
        return a.id - b.id;
      })[this.todos.length - 1].id + 1;
    },
    markDone(id: number): void {
      const todo = this.todos.find(x => x.id == id);
      if (todo) {
        todo.done = true;
        todo.completed = getCurrentDate();
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    markUndone(id: number): void {
      const todo = this.todos.find(x => x.id == id);
      if (todo) {
        todo.done = false;
        todo.completed = '';
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    deleteTodo(id: number): void {
      this.todos = this.todos.filter(item => {
        return item.id != id;
      })
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    getTodos(): void {
      const localStorageTodos = localStorage.getItem('todos');
      if (localStorageTodos) {
        this.todos = JSON.parse(localStorageTodos);
        this.sortTodos();
      }
    }
  },
})