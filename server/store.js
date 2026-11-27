const initialTodos = [
  { id: 1, title: 'Lire le cours sur la CI', done: true },
  { id: 2, title: 'Écrire un workflow GitHub Actions', done: false },
  { id: 3, title: 'Ouvrir une pull request', done: false },
];

let todos = [];
let nextId = 1;

export function resetTodos() {
  todos = initialTodos.map((todo) => ({ ...todo }));
  nextId = initialTodos.length + 1;
}

export function getTodos() {
  return todos;
}

export function addTodo(title) {
  const todo = { id: nextId++, title, done: false };
  todos.push(todo);
  return todo;
}

export function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;
  todo.done = !todo.done;
  return todo;
}

export function removeTodo(id) {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}

resetTodos();
