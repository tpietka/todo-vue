import { Todo } from '../models/todo';
import { defineStore } from 'pinia';
import {
  getCurrentDateTime,
  getCurrentDate,
  formatDateToYYYYMMDD,
  getTomorrowsDate,
} from '../helpers/date';
import { useAlerts } from './alerts';
import { i18n } from '../locale/i18n'
import { Validation } from '@vuelidate/core';
import { useRouter } from 'vue-router';

const { t } = i18n.global

const isTextIncluded = (originalValue: string, searchValue: string): boolean => {
  return originalValue.toLowerCase().includes(searchValue.toLowerCase());
};

const hasSelectedTag = (todoTags: string[], searchedTags: string[]) => {
  if (searchedTags.length > 0) {
    return searchedTags.some((tag) => todoTags.includes(tag));
  }
  return true;
};

const isDeadline = (date: string) => {
  return getCurrentDate() >= formatDateToYYYYMMDD(date);
};

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
    };
  },
  getters: {
    doneTodos(state: StoreState): Todo[] {
      return this.activeTodos.filter((todo) => {
        return (
          todo.done &&
          isTextIncluded(todo.title, state.search) &&
          hasSelectedTag(todo.tags, state.selectedTags)
        );
      });
    },
    activeTodos(state: StoreState): Todo[] {
      return state.todos.filter((todo) => {
        return !todo.archived;
      });
    },
    activeTags(): string[] {
      let tags: string[] = [];
      this.activeTodos.forEach((todo) => {
        if (todo.tags?.length > 0)
          todo.tags.forEach((tag) => {
            tags.push(tag);
          });
      });
      return [...new Set(tags)];
    },
    archivedTodos(state: StoreState): Todo[] {
      return state.todos.filter((todo) => {
        return todo.archived;
      });
    },
    archivedSelectedTodos(state: StoreState): Todo[] {
      return this.archivedTodos.filter((todo) => {
        return (
          isTextIncluded(todo.title, state.search) &&
          hasSelectedTag(todo.tags, state.selectedTags)
        );
      });
    },
    archivedTags(): string[] {
      let tags: string[] = [];
      this.archivedTodos.forEach((todo) => {
        if (todo.tags?.length > 0)
          todo.tags.forEach((tag) => {
            tags.push(tag);
          });
      });
      return [...new Set(tags)];
    },
    awaitingTodos(state: StoreState): Todo[] {
      return this.activeTodos.filter((todo) => {
        return (
          !todo.done &&
          isTextIncluded(todo.title, state.search) &&
          hasSelectedTag(todo.tags, state.selectedTags)
        );
      });
    },
    todayTodos(state: StoreState): Todo[] {
      return this.activeTodos.filter((todo) => {
        return (
          isDeadline(todo.deadline) &&
          !todo.done &&
          isTextIncluded(todo.title, state.search) &&
          hasSelectedTag(todo.tags, state.selectedTags)
        );
      });
    },
    nextDaysTodos(state: StoreState): Todo[] {
      return this.activeTodos.filter((todo) => {
        return (
          !isDeadline(todo.deadline) &&
          !todo.done &&
          isTextIncluded(todo.title, state.search) &&
          hasSelectedTag(todo.tags, state.selectedTags)
        );
      });
    },
  },
  actions: {
    async submitForm(v: Validation, todo: Todo) {
      const router = useRouter();
      v.$touch();
      if (v.$invalid) {
        this.displayAlert(t('message.formValidationFailed'), 'warning');
      } else {
        if (todo.id) {
          this.editTodo(Number(todo.id), todo);
        } else {
          this.addTodo(todo);
        }
        await router.push('/');
      }
    },
    updateTask(id: number, index: number, value: boolean) {
      const todo = this.todos.find((x) => x.id == id);
      if (todo) {
        todo.tasks[index].done = value;
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));

      this.displayAlert(t('message.taskUpdated'), 'positive');
    },
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

      this.displayAlert(t('message.todoCreated'), 'positive');
    },
    editTodo(id: number, updatedTodo: Todo): void {
      let todo = this.todos.filter((todo) => {
        return todo.id === id;
      })[0];
      todo = updatedTodo;
      localStorage.setItem('todos', JSON.stringify(this.todos));

      this.displayAlert(t('message.todoModified'), 'positive');
    },
    getTodo(id: number): Todo {
      if (this.todos.length < 1) {
        this.getTodos();
      }
      return this.todos.filter((todo) => {
        return todo.id === id;
      })[0];
    },
    archiveTodo(id: number): void {
      let todo = this.todos.filter((todo) => {
        return todo.id === id;
      })[0];
      todo.archived = true;
      localStorage.setItem('todos', JSON.stringify(this.todos));

      this.displayAlert(t('message.todoArchived'), 'positive');
    },
    moveTodo(id: number, type: string): void {
      let todo = this.todos.filter((todo) => {
        return todo.id == id;
      })[0];
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
          return 1;
        } else {
          return 0;
        }
      });
    },
    getNextId(): number {
      if (this.todos.length < 1) {
        return 1;
      }
      return (
        this.todos.sort((a, b) => {
          return a.id - b.id;
        })[this.todos.length - 1].id + 1
      );
    },
    setDone(id: number): void {
      const todo = this.todos.find((x) => x.id == id);
      if (todo) {
        todo.done = true;
        todo.completed = getCurrentDate();
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));

      this.displayAlert(t('message.todoDone'), 'positive');
    },
    displayAlert(message: string, type: string) {
      const { displayAlert } = useAlerts();
      displayAlert(message, type);
    },
    setNotDone(id: number): void {
      const todo = this.todos.find((x) => x.id == id);
      if (todo) {
        todo.done = false;
        todo.completed = '';
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));

      this.displayAlert(t('message.todoUndone'), 'positive');
    },
    deleteTodo(id: number): void {
      this.todos = this.todos.filter((item) => {
        return item.id != id;
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));

      this.displayAlert(t('message.todoDeleted'), 'positive');
    },
    getTodos(): void {
      const localStorageTodos = localStorage.getItem('todos');
      if (localStorageTodos) {
        this.todos = JSON.parse(localStorageTodos);
        this.sortTodos();
      }
    },
  },
});

