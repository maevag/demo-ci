import { beforeEach, describe, expect, test } from 'vitest';
import request from 'supertest';
import { createApp } from '../server/app.js';
import { resetTodos } from '../server/store.js';

const app = createApp();

beforeEach(() => {
  resetTodos();
});

describe('API /api/todos', () => {
  test('liste les tâches de départ', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
  });

  test('crée une tâche avec un titre', async () => {
    const res = await request(app).post('/api/todos').send({ title: 'Nouvelle tâche' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Nouvelle tâche');
    expect(res.body.done).toBe(false);

    const list = await request(app).get('/api/todos');
    expect(list.body.length).toBe(4);
  });

  test('refuse une tâche dont le titre est vide', async () => {
    const res = await request(app).post('/api/todos').send({ title: '' });
    expect(res.status).toBe(400);
  });

  test('refuse une tâche dont le titre ne contient que des espaces', async () => {
    const res = await request(app).post('/api/todos').send({ title: '   ' });
    expect(res.status).toBe(400);
  });

  test('inverse l’état terminé d’une tâche', async () => {
    const res = await request(app).patch('/api/todos/2');
    expect(res.status).toBe(200);
    expect(res.body.done).toBe(true);
  });

  test('supprime une tâche', async () => {
    const res = await request(app).delete('/api/todos/1');
    expect(res.status).toBe(204);

    const list = await request(app).get('/api/todos');
    expect(list.body.length).toBe(2);
  });

  test('renvoie 404 quand on bascule une tâche inconnue', async () => {
    const res = await request(app).patch('/api/todos/999');
    expect(res.status).toBe(404);
  });

  test('renvoie 404 quand on supprime une tâche inconnue', async () => {
    const res = await request(app).delete('/api/todos/999');
    expect(res.status).toBe(404);
  });
});
