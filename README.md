# Démo CI : todo list

Petite todo list (React + Express) qui sert de support à un cours sur l'intégration continue. Aucune base de données ni service externe : les tâches sont gardées en mémoire par le serveur.

## Structure

```
server/   API Express (app.js exporte createApp(), index.js lance le serveur, store.js garde les tâches en mémoire)
src/      Front React (Vite) ; countDone.js contient la logique du compteur
tests/    Tests Vitest : countDone (unitaires) et routes de l'API (supertest)
```

Node 24 (`.nvmrc`), npm.

## Scripts

| Commande        | Rôle                                                         |
| --------------- | ------------------------------------------------------------ |
| `npm run dev`   | Lance l'API (port 3001) et le front Vite en parallèle        |
| `npm run lint`  | ESLint, échoue au moindre warning                            |
| `npm test`      | Lance les tests une fois                                     |
| `npm run build` | Build de production du front dans `dist/`                    |

## Branches

- `main` : l'application, sans CI.
- `feature/ci` : ajoute `.github/workflows/ci.yml` (lint, tests, build à chaque push et pull request).
- `demo/echec` : part de `feature/ci` et casse le lint, puis un test.

## Déroulé de la démo

1. Sur `main`, montrer l'app (`npm run dev`) et lancer `npm run lint`, `npm test`, `npm run build` en local.
2. Créer à la main `.github/workflows/ci.yml` (le contenu de référence est dans `feature/ci` : `git show feature/ci:.github/workflows/ci.yml`).
3. Committer, pousser une branche, ouvrir une pull request : le job `checks` passe au vert.
4. Basculer sur `demo/echec` et la pousser :
   - premier commit : le lint échoue (variable inutilisée dans `src/`) ;
   - second commit : le test de `countDone` échoue (Expected / Received).
