import { useEffect, useState } from 'react';
import { countDone } from './countDone.js';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) return;
    const todo = await res.json();
    setTodos([...todos, todo]);
    setTitle('');
  }

  async function handleToggle(id) {
    const res = await fetch(`/api/todos/${id}`, { method: 'PATCH' });
    if (!res.ok) return;
    const updated = await res.json();
    setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
  }

  async function handleDelete(id) {
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (!res.ok) return;
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <main>
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Nouvelle tâche"
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleToggle(todo.id)}
              />
              <span className={todo.done ? 'done' : ''}>{todo.title}</span>
            </label>
            <button onClick={() => handleDelete(todo.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <p>
        {countDone(todos)} tâches terminées sur {todos.length}
      </p>
    </main>
  );
}
