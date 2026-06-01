# Full-Stack TypeScript Template

Template de démarrage full-stack avec un front React, un back Express et une base PostgreSQL, orchestrés via Docker.

---

## Stack technique

### Frontend — `/app`

| Outil | Rôle |
|---|---|
| [Vite](https://vite.dev) + [React 19](https://react.dev) | Bundler et framework UI |
| [TypeScript](https://www.typescriptlang.org) | Typage statique |
| [TanStack React Query](https://tanstack.com/query) | Fetching, cache et état serveur |
| [@lukemorales/query-key-factory](https://github.com/lukemorales/query-key-factory) | Query keys typées et centralisées |
| [Zod](https://zod.dev) | Validation et inférence de types sur les réponses API |
| [Styled Components](https://styled-components.com) | CSS-in-JS typé |
| [Material UI](https://mui.com) | Bibliothèque de composants UI |
| [React Hot Toast](https://react-hot-toast.com) | Notifications — les erreurs réseau remontent automatiquement en toast |

### Backend — `/server`

| Outil | Rôle |
|---|---|
| [Express 5](https://expressjs.com) | Serveur HTTP |
| [TypeScript](https://www.typescriptlang.org) | Typage statique |
| [Drizzle ORM](https://orm.drizzle.team) | ORM TypeScript-first + migrations |
| [PostgreSQL 16](https://www.postgresql.org) | Base de données |
| [Zod](https://zod.dev) | Validation des corps de requêtes |

### Infra

| Outil | Rôle |
|---|---|
| [Docker](https://www.docker.com) + Compose | Orchestration des 3 services (db, server, app) |
| [nginx](https://nginx.org) | Sert le front en prod + proxy `/api/*` vers le server |

---

## Structure du projet

```
/
├── docker-compose.yml
├── app/                        # Frontend React
│   ├── src/
│   │   ├── api/
│   │   │   ├── client/
│   │   │   │   ├── client.ts       # Wrapper fetch typé avec Zod
│   │   │   │   └── queryClient.ts  # QueryClient — toast auto sur erreur
│   │   │   ├── queries/            # Un fichier par route GET
│   │   │   └── mutations/          # Un fichier par mutation
│   │   └── types/                  # Schémas Zod partagés (front + appels API)
│   ├── Dockerfile
│   └── nginx.conf
└── server/                     # Backend Express
    ├── src/
    │   ├── db/
    │   │   ├── index.ts            # Connexion Drizzle
    │   │   ├── schema.ts           # Définition des tables
    │   │   └── migrate.ts          # Runner de migrations
    │   ├── middleware/
    │   │   ├── errorHandler.ts     # AppError + ZodError → JSON propre
    │   │   └── validate.ts         # Middleware de validation Zod générique
    │   └── routes/
    │       └── [domaine]/          # Un dossier par entité métier
    │           ├── [domaine].schema.ts
    │           ├── [domaine].controller.ts
    │           └── [domaine].router.ts
    ├── drizzle/                # Fichiers SQL de migration (à commiter)
    ├── drizzle.config.ts
    ├── tsconfig.json           # Type-check uniquement (noEmit: true)
    ├── tsconfig.build.json     # Build production (noEmit: false)
    └── Dockerfile
```

---

## Lancer le projet

### Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js 22+](https://nodejs.org) (pour le développement local)

### Première fois

**1. Cloner et installer les dépendances en local**

```bash
cd app && npm install
cd ../server && npm install
```

**2. Générer les migrations Drizzle**

Les fichiers SQL de migration doivent être générés localement avant le build Docker. Depuis `/server` :

```bash
npm run db:generate
```

> Les fichiers générés dans `server/drizzle/` doivent être commités — Docker en a besoin au moment du build.

**3. Lancer Docker Compose**

Depuis la racine du projet :

```bash
docker compose up --build
```

Docker démarre les services dans cet ordre :
1. **`db`** — PostgreSQL, attend d'être prêt (`pg_isready`)
2. **`server`** — applique automatiquement les migrations puis démarre Express
3. **`app`** — build Vite servi par nginx

| Service | URL |
|---|---|
| Frontend | http://localhost |
| API | http://localhost:3000/api |
| PostgreSQL | localhost:5432 |

---

### Commandes courantes

#### Docker

```bash
# Lancer en arrière-plan
docker compose up -d

# Lancer sans rebuilder les images
docker compose up

# Arrêter les containers
docker compose down

# Arrêter et supprimer les données PostgreSQL (repart de zéro)
docker compose down -v

# Voir les logs du backend en live
docker compose logs -f server
```

#### Après un changement de schéma Drizzle

```bash
# 1. Générer la migration (en local, dans /server)
npm run db:generate

# 2. Rebuilder uniquement le server
docker compose up --build server
```

---

### Développement local (sans Docker)

Pour itérer rapidement sans passer par Docker :

**Backend** — démarrer PostgreSQL séparément (via Docker ou en local), puis :

```bash
cd server
cp .env.example .env   # renseigner DATABASE_URL
npm run db:migrate     # appliquer les migrations
npm run dev            # tsx watch — hot reload
```

**Frontend** — le proxy Vite redirige automatiquement `/api/*` vers `localhost:3000` :

```bash
cd app
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API (via proxy Vite) | http://localhost:5173/api |

---

### Scripts disponibles

#### `/server`

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur en mode watch (tsx) |
| `npm run build` | Compile TypeScript vers `dist/` |
| `npm run start` | Lance le serveur compilé |
| `npm run db:generate` | Génère les fichiers SQL de migration depuis le schéma |
| `npm run db:migrate` | Applique les migrations en base |
| `npm run db:studio` | Ouvre Drizzle Studio (UI visuelle de la DB) |

#### `/app`

| Commande | Description |
|---|---|
| `npm run dev` | Démarre Vite en mode développement |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualise le build de production |

---

## Ajouter une nouvelle entité

### 1. Côté serveur — déclarer la table et créer les routes

**`server/src/db/schema.ts`** — ajouter la table Drizzle, puis régénérer les migrations :

```bash
cd server && npm run db:generate
```

**`server/src/routes/[domaine]/`** — créer les 3 fichiers :

```
[domaine].schema.ts      # Schémas Zod de validation des requêtes
[domaine].controller.ts  # Handlers Express (logique métier + Drizzle)
[domaine].router.ts      # Déclaration des routes Express
```

Enregistrer le router dans **`server/src/routes/index.ts`** :

```ts
import monDomaine from './monDomaine/monDomaine.router';
router.use('/mon-domaine', monDomaine);
```

### 2. Côté front — typer et appeler l'API

**`app/src/types/[domaine].ts`** — schéma Zod aligné sur la réponse du serveur :

```ts
export const MonDomaineSchema = z.object({ ... });
export type MonDomaine = z.infer<typeof MonDomaineSchema>;
```

**`app/src/api/queries/get[Domaine].ts`** — hook React Query :

```ts
export const useGet[Domaine] = () => useQuery({ ...queryKeys... });
```

**`app/src/api/mutations/create[Domaine].ts`** — hook de mutation :

```ts
export const useCreate[Domaine] = () => useMutation({ ... });
```
