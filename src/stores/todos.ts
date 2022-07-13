import { Todo } from '../models/todo';
import { defineStore } from 'pinia'
import { getCurrentDateTime, getCurrentDate, formatDateToYYYYMMDD, getTomorrowsDate } from '../helpers/date';
import { useAlerts } from './alerts';

interface StoreState {
  todos: Todo[];
  search: '';
}
export const useTodos = defineStore('todos', {
  state: (): StoreState => {
    return {
      todos: [],
      search: '',
    }
  },
  getters: {
    doneTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return todo.done && !todo.archived && todo.title.includes(state.search);
      })
    },
    archivedTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return todo.archived && todo.title.includes(state.search);
      })
    },
    awaitingTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return !todo.done && !todo.archived && todo.title.includes(state.search);
      })
    },
    todayTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return getCurrentDate() >= formatDateToYYYYMMDD(todo.deadline) && !todo.archived && !todo.done && todo.title.includes(state.search);
      })
    },
    nextDaysTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return getCurrentDate() < formatDateToYYYYMMDD(todo.deadline) && !todo.archived && !todo.done && todo.title.includes(state.search);
      })
    },
  },
  actions: {
    addTodo(todo: Todo): void {
      todo.id = this.getNextId();
      todo.done = false;
      todo.created = getCurrentDateTime();
      this.todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.sortTodos();

      const { displayAlert } = useAlerts();
      displayAlert('Todo created', 'positive');
    },
    editTodo(id: number, updatedTodo: Todo): void {
      let todo = this.todos.filter(todo => {
        return todo.id === id;
      })[0];
      todo = updatedTodo;
      localStorage.setItem('todos', JSON.stringify(this.todos));

      const { displayAlert } = useAlerts();
      displayAlert('Todo modified', 'positive');
    },
    getTodo(id: number): Todo {
      if (this.todos.length < 1) {
        this.getTodos();
      }
      return this.todos.filter(todo => {
        return todo.id === id;
      })[0];
    },
    archiveTodo(id: number): void {
      let todo = this.todos.filter(todo => {
        return todo.id === id;
      })[0];
      todo.archived = true;
      localStorage.setItem('todos', JSON.stringify(this.todos));

      const { displayAlert } = useAlerts();
      displayAlert('Todo archived', 'positive');
    },
    moveTodo(id: number, type: string): void {
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
    setDone(id: number): void {
      const todo = this.todos.find(x => x.id == id);
      if (todo) {
        todo.done = true;
        todo.completed = getCurrentDate();
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));

      const { displayAlert } = useAlerts();
      displayAlert('Todo done', 'positive');
    },
    setNotDone(id: number): void {
      const todo = this.todos.find(x => x.id == id);
      if (todo) {
        todo.done = false;
        todo.completed = '';
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));

      const { displayAlert } = useAlerts();
      displayAlert('Todo undone', 'positive');
    },
    deleteTodo(id: number): void {
      this.todos = this.todos.filter(item => {
        return item.id != id;
      })
      localStorage.setItem('todos', JSON.stringify(this.todos));

      const { displayAlert } = useAlerts();
      displayAlert('Todo deleted', 'positive');
    },
    getTodos(): void {
      const localStorageTodos = localStorage.getItem('todos');
      if (localStorageTodos) {
        this.todos = JSON.parse(localStorageTodos);
        this.sortTodos();
      }
    },
  },
})