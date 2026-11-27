import { describe, expect, test } from 'vitest';
import { countDone } from '../src/countDone.js';

describe('countDone', () => {
  test('renvoie 0 pour une liste vide', () => {
    expect(countDone([])).toBe(0);
  });

  test('renvoie 0 quand aucune tâche n’est terminée', () => {
    const todos = [
      { id: 1, title: 'A', done: false },
      { id: 2, title: 'B', done: false },
    ];
    expect(countDone(todos)).toBe(0);
  });

  test('compte uniquement les tâches terminées', () => {
    const todos = [
      { id: 1, title: 'A', done: true },
      { id: 2, title: 'B', done: false },
      { id: 3, title: 'C', done: true },
    ];
    expect(countDone(todos)).toBe(2);
  });
});
