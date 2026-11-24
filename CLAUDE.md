# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This is a timed school exercise (45 min, "prova generale" of an exam). Right now the repo contains only the spec:
[esercitazione_1_biblioteca_di_quartiere.md](esercitazione_1_biblioteca_di_quartiere.md). It is the source of truth — read it before
changing anything. The project is graded by **automated tests**, so paths, field names, status codes and Italian
message strings must match the spec **literally** (e.g. `errore`, `dettagli`, `campo`, `messaggio`, `num_libri`,
`Nessun libro in catalogo`, `Autore non trovato`).

## Stack and commands

- Node.js, **Express 5**, **CommonJS** (`require`, no `"type": "module"`), SQLite (`node:sqlite`, `better-sqlite3` or TypeORM),
  **zod** for validation, **EJS** views, static files from `public/`.
- `npm install` then `npm start` must be enough to run it. `start` must use `node` (not nodemon); a separate `dev` script may use `node --watch`.
- Config from env: `PORT` (default 3000), `API_KEY`. Ship a `.env.example` with `PORT=3000` and `API_KEY=biblio-chiave-2026`.
  Since `npm start` alone must work, don't hard-require a `.env` file (load it optionally, e.g. `process.loadEnvFile` in a try/catch or `node --env-file-if-exists`).
- No test suite is provided; verify manually with `curl` against the running server.

## Architecture requirements (cross-cutting)

- **DB bootstrap on startup**: the DB file is deleted before grading, so the app must create tables
  (`autori`, `libri`) with constraints itself and run the `seme.sql` inserts (appendix of the spec — only INSERTs, no DDL) when tables are empty.
  Constraints: `autori.nome` UNIQUE; `libri.genere` in (`romanzo`,`saggio`,`poesia`,`racconti`); `anno` 1450–2026;
  UNIQUE(`autore_id`, `titolo`); FK `autore_id` → `autori` (enable foreign keys pragma). Always use parameterized queries.
- **Errors**: always JSON `{ errore }`; validation 400 adds `dettagli: [{ campo, messaggio }]`, one per invalid field.
  Use a single centralized error handler (no stack traces in responses), which must also turn malformed JSON bodies into 400 JSON.
  Unknown `/api/...` routes → 404 JSON.
- **`:id` params** validated with zod as positive integers on every route that has one (API and the EJS page) → 400 if invalid.
- **POST /api/libri**: zod `.strict()` object (extra fields → 400); nonexistent `autore_id` → 400 with `dettagli` on `autore_id`;
  duplicate title for the same author → 409. Response 201 `{ id, titolo, genere, anno, autore_id }`.
- **API key**: `POST /api/libri` and `DELETE /api/libri/:id` require header `X-Api-Key` equal to `API_KEY` → else 401 `{ errore }`.
- `app.disable('x-powered-by')`.
- `GET /api/autori` sorted by `nome`, each with `num_libri`; `GET /api/autori/:id` also includes `num_libri` and `libri`
  (`id, titolo, genere, anno`) sorted by `anno` ascending, `[]` if none.
- **EJS page** `GET /autori/:id`: escape with `<%= %>` only; link `/stile.css` (served from `public/stile.css`);
  404 HTML page containing `Autore non trovato`. Seed author 4 (Isabel Allende) has no books — useful to check the empty state.

## Delivery

Zip named `cognome-nome.zip`, without `node_modules` and without the database file — keep the DB file name in `.gitignore`.
