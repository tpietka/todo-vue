import { setActivePinia, createPinia } from 'pinia'
import { useTodos } from '../stores/todos'
import { toRefs } from 'vue';
import { Todo } from '../models/todo';
import { getCurrentDate, getTomorrowsDate } from '../helpers/date';

let newTodo = {} as Todo;

describe('Todos Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    newTodo = {
      id: 0,
      title: 'New todo',
      deadline: getTomorrowsDate(),
      done: false,
      description: 'Test description',
      archived: false,
      priority: 2,
      tags: [],
      created: '',
      completed: '',
    }
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
    const { addTodo, setDone } = useTodos();
    addTodo(newTodo);
    expect(doneTodos.value.length).toBe(0);
    setDone(1);
    expect(doneTodos.value.length).toBe(1);
    expect(todos.value[0].completed).not.toBeNull();
  })

  it('correctly set todo as for today with expiring deadline', () => {
    const { todayTodos } = toRefs(useTodos());
    expect(todayTodos.value.length).toBe(0);
    const { addTodo } = useTodos();
    newTodo.deadline = getCurrentDate();
    addTodo(newTodo);
    expect(todayTodos.value.length).toBe(1);
  })


  it('removes todo', () => {
    const { todos } = toRefs(useTodos());
    const { addTodo, deleteTodo } = useTodos();
    addTodo(newTodo);
    expect(todos.value.length).toBe(1);
    deleteTodo(newTodo.id);
    expect(todos.value.length).toBe(0);
  })

  it('archives todo', () => {
    const { addTodo, archiveTodo, getTodo } = useTodos();
    addTodo(newTodo);
    archiveTodo(1);
    const todo = getTodo(1);
    todo.archived
    expect(todo.archived).toBe(true);
  })

  it('sets next correct id', () => {
    const { todos } = toRefs(useTodos());
    const { addTodo } = useTodos();
    addTodo(newTodo);
    addTodo(newTodo);
    expect(todos.value.length).toBe(2);
    expect(todos.value[todos.value.length - 1].id).toBe(2);
  })

  it('filter list of todos by search value', () => {
    const { search, awaitingTodos } = toRefs(useTodos());
    const { addTodo } = useTodos();
    let secondTodo = { ...newTodo };
    secondTodo.title = 'Second Todo';
    addTodo(newTodo);
    addTodo(secondTodo);
    expect(awaitingTodos.value.length).toBe(2);
    search.value = 'second';
    expect(awaitingTodos.value.length).toBe(1);
  })
})