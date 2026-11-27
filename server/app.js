import express from 'express';
import { addTodo, getTodos, removeTodo, toggleTodo } from './store.js';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/api/todos', (req, res) => {
    res.json(getTodos());
  });

  app.post('/api/todos', (req, res) => {
    const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';
    if (title === '') {
      return res.status(400).json({ error: 'Le titre est obligatoire' });
    }
    res.status(201).json(addTodo(title));
  });

  app.patch('/api/todos/:id', (req, res) => {
    const todo = toggleTodo(Number(req.params.id));
    if (!todo) {
      return res.status(404).json({ error: 'Tâche introuvable' });
    }
    res.json(todo);
  });

  app.delete('/api/todos/:id', (req, res) => {
    if (!removeTodo(Number(req.params.id))) {
      return res.status(404).json({ error: 'Tâche introuvable' });
    }
    res.status(204).end();
  });

  return app;
}
