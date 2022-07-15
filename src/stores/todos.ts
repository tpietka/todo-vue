import { Todo } from '../models/todo';
import { defineStore, Store } from 'pinia'
import { getCurrentDateTime, getCurrentDate, formatDateToYYYYMMDD, getTomorrowsDate } from '../helpers/date';
import { useAlerts } from './alerts';

const isTextIncluded = (originalValue: string, searchValue: string): boolean => {
  return originalValue.toLowerCase().includes(searchValue.toLowerCase())
}

const hasSelectedTag = (todoTags: string[], searchedTags: string[]) => {
  if (searchedTags.length > 0) {
    return searchedTags.some(tag => todoTags.includes(tag));
  }
  return true;
}

const isDeadline = (date: string) => {
  return getCurrentDate() >= formatDateToYYYYMMDD(date)
}

interface StoreState {
  todos: Todo[];
  search: string;
  selectedTags: string[];
}
export const useTodos = defineStore('todos', {
  state: (): StoreState => {
    return {
      todos: [],
      search: '',
      selectedTags: [],
    }
  },
  getters: {
    doneTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return todo.done && !todo.archived && isTextIncluded(todo.title, state.search) && hasSelectedTag(todo.tags, state.selectedTags);
      })
    },
    allTags: (state: StoreState): string[] => {
      let tags: string[] = [];
      state.todos.forEach(todo => {
        if (todo.tags?.length > 0)
          todo.tags.forEach(tag => {
            tags.push(tag);
          })
      })
      return [...new Set(tags)];
    },
    archivedTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return todo.archived && isTextIncluded(todo.title, state.search) && hasSelectedTag(todo.tags, state.selectedTags);
      })
    },
    awaitingTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return !todo.done && !todo.archived && isTextIncluded(todo.title, state.search) && hasSelectedTag(todo.tags, state.selectedTags);
      })
    },
    todayTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return isDeadline(todo.deadline) && !todo.archived && !todo.done && isTextIncluded(todo.title, state.search) && hasSelectedTag(todo.tags, state.selectedTags);
      })
    },
    nextDaysTodos: (state: StoreState): Todo[] => {
      return state.todos.filter(todo => {
        return !isDeadline(todo.deadline) && !todo.archived && !todo.done && isTextIncluded(todo.title, state.search) && hasSelectedTag(todo.tags, state.selectedTags);
      })
    },
  },
  actions: {
    toggleTag(tag: string) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
      } else {
        this.selectedTags.push(tag);
      }
    },
    addTodo(todo: Todo): void {
      todo.id = this.getNextId();
      todo.done = false;
      todo.created = getCurrentDateTime();
      this.todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.sortTodos();

      this.displayAlert('Todo created', 'positive');
    },
    editTodo(id: number, updatedTodo: Todo): void {
      let todo = this.todos.filter(todo => {
        return todo.id === id;
      })[0];
      todo = updatedTodo;
      localStorage.setItem('todos', JSON.stringify(this.todos));

      this.displayAlert('Todo modified', 'positive');
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

      this.displayAlert('Todo archived', 'positive');
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

      this.displayAlert('Todo done', 'positive');
    },
    displayAlert(message: string, type: string) {
      const { displayAlert } = useAlerts();
      displayAlert(message, type);
    },
    setNotDone(id: number): void {
      const todo = this.todos.find(x => x.id == id);
      if (todo) {
        todo.done = false;
        todo.completed = '';
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));

      this.displayAlert('Todo undone', 'positive');
    },
    deleteTodo(id: number): void {
      this.todos = this.todos.filter(item => {
        return item.id != id;
      })
      localStorage.setItem('todos', JSON.stringify(this.todos));

      this.displayAlert('Todo deleted', 'positive');
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