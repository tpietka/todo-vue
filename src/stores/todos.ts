import { Todo } from '../models/todo';
import { defineStore } from 'pinia'
import { getCurrentDateTime, getCurrentDateWithoutTime, getDateWithoutTime } from '../helpers/date';

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
    doneTodos: (state: StoreState) => {
      return state.todos.filter(todo => {
        return todo.done;
      })
    },
    awaitingTodos: (state: StoreState) => {
      return state.todos.filter(todo => {
        return !todo.done;
      })
    },
    todayTodos: (state: StoreState) => {
      return state.todos.filter(todo => {
        return getCurrentDateWithoutTime() >= getDateWithoutTime(todo.deadline) && !todo.done;
      })
    },
    nextDaysTodos: (state: StoreState) => {
      return state.todos.filter(todo => {
        return getCurrentDateWithoutTime() < getDateWithoutTime(todo.deadline) && !todo.done;
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
        this.sortTodos();
      }
    }
  },
})