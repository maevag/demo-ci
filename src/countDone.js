export function countDone(todos) {
  return todos.filter((todo) => todo.done).length;
}
