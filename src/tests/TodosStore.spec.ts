import { setActivePinia, createPinia } from 'pinia'
import { useTodos } from '../stores/todos'
import { toRefs } from 'vue';
import { Todo } from '../models/todo';
import { getCurrentDate, getTomorrowsDate } from '../helpers/date';

const newTodo: Todo = {
  id: 0,
  title: 'New todo',
  deadline: getTomorrowsDate(),
  done: false,
  created: '',
  completed: '',
}

describe('Todos Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds todo', () => {
    const { todos } = toRefs(useTodos());
    const { addTodo } = useTodos();
    expect(todos.value.length).toBe(0);
    addTodo(newTodo);
    expect(todos.value.length).toBe(1);
  })

  it('marks todo as done', () => {
    const { doneTodos, todos } = toRefs(useTodos());
    const { addTodo, markDone } = useTodos();
    addTodo(newTodo);
    expect(doneTodos.value.length).toBe(0);
    markDone(1);
    expect(doneTodos.value.length).toBe(1);
    expect(todos.value[0].completed).not.toBeNull();
  })

  it('correctly set todo as for today with expiring deadline', () => {
    const { todayTodos } = toRefs(useTodos());
    const { addTodo } = useTodos();
    newTodo.deadline = getCurrentDate();
    addTodo(newTodo);
    expect(todayTodos.value.length).toBe(1);
  })

  it('displays correct number of todos in counter', () => {
    const { awaitingTodosCount } = toRefs(useTodos());
    const { addTodo } = useTodos();
    addTodo(newTodo);
    expect(awaitingTodosCount.value).toBe(1);
  })

  it('removes todo', () => {
    const { todos } = toRefs(useTodos());
    const { addTodo, deleteTodo } = useTodos();
    addTodo(newTodo);
    expect(todos.value.length).toBe(1);
    deleteTodo(newTodo.id);
    expect(todos.value.length).toBe(0);
  })

  it('sets next correct id', () => {
    const { todos } = toRefs(useTodos());
    const { addTodo } = useTodos();
    addTodo(newTodo);
    addTodo(newTodo);
    expect(todos.value.length).toBe(2);
    expect(todos.value[todos.value.length - 1].id).toBe(2);
  })
})