# Esercitazione — Biblioteca di Quartiere

**Tempo: 45 minuti.** Si consegna uno zip su Classroom.

È una prova generale della verifica: stesse regole, meno cose da fare. La biblioteca comunale organizza
l'archivio digitale e vuole un piccolo backend: un'**API REST** per gli autori e i loro libri
e una **pagina web** con la bibliografia di un autore. Il progetto verrà provato con dei **test automatici**:
rispettate **alla lettera** percorsi, nomi dei campi, status code e testi indicati qui sotto.

---

## 1. Requisiti tecnici

- Node.js con **Express 5** (CommonJS), database **SQLite** (`node:sqlite`, `better-sqlite3` o TypeORM),
  validazione con **zod**, pagina con **EJS**, file statici dalla cartella `public/`.
- Configurazione dalle variabili d'ambiente `PORT` (predefinita **3000**) e `API_KEY`. Nel progetto mettete un file `.env.example`:

  ```
  PORT=3000
  API_KEY=biblio-chiave-2026
  ```

- **`npm install` e poi `npm start` devono bastare** per avviare il server (`start` con `node`, non con nodemon).
- **All'avvio il database si crea da solo**: tabelle e dati di esempio del file `seme.sql` (allegato)
  quando le tabelle sono vuote. Prima della correzione il file del database verrà cancellato.

## 2. I dati

| Tabella | Colonne |
|---|---|
| `autori` | `id` (intero, chiave primaria), `nome` (testo, **unico**), `nazionalita` (testo) |
| `libri` | `id`, `titolo`, `genere` (`romanzo`, `saggio`, `poesia` o `racconti`), `anno` (intero da 1450 a 2026), `autore_id` → `autori` |

Lo stesso autore non può avere due libri con lo stesso titolo: la coppia (`autore_id`, `titolo`) è **unica**.

## 3. L'API

**Gli errori** sono sempre JSON con il campo `errore`. Per i dati non validi (400) c'è anche `dettagli`,
con un elemento per ogni campo sbagliato:

```json
{ "errore": "Dati non validi", "dettagli": [{ "campo": "anno", "messaggio": "..." }] }
```

| Richiesta | Chiave | Risposta |
|---|:---:|---|
| `GET /api/autori` | | 200 tutti gli autori |
| `GET /api/autori/:id` | | 200 l'autore con i `libri` |
| `POST /api/libri` | ✔ | 201 il libro creato `{ id, titolo, genere, anno, autore_id }` |
| `DELETE /api/libri/:id` | ✔ | 204 |

### `GET /api/autori`

Un array con tutti gli autori **ordinati per nome**. `num_libri` è il numero dei libri dell'autore:

```json
[ { "id": 2, "nome": "Elena Ferrante", "nazionalita": "Italiana", "num_libri": 2 }, ... ]
```

### `GET /api/autori/:id`

L'autore con in più `libri`: i suoi libri **ordinati per anno (crescente)**, con `id`, `titolo`, `genere`, `anno`
(`[]` se non ce ne sono).

```json
{ "id": 1, "nome": "Italo Calvino", "nazionalita": "Italiana", "num_libri": 3,
  "libri": [{ "id": 2, "titolo": "Il sentiero dei nidi di ragno", "genere": "romanzo", "anno": 1947 }, ...] }
```

Autore inesistente → **404**. `id` che non è un intero positivo (es. `/api/autori/abc`) → **400**
(vale per tutte le rotte con `:id`).

### `POST /api/libri` e `DELETE /api/libri/:id`

- Body: `titolo` (da 1 a 100 caratteri), `genere`, `anno` (intero da 1450 a 2026), `autore_id` (intero positivo), tutti obbligatori.
- Campi non previsti → **400**. Autore inesistente → **400** (con `dettagli` sul campo `autore_id`).
- Titolo già usato per lo stesso autore → **409** (per un altro autore va bene).
- `DELETE`: **204**; libro inesistente → **404**.

## 4. Sicurezza

1. **Chiave API.** Le richieste con ✔ richiedono l'header `X-Api-Key` uguale ad `API_KEY`: senza header
   o con una chiave sbagliata → **401** `{ errore }`. La chiave si legge dalla configurazione.
2. **Niente `X-Powered-By`** (`app.disable('x-powered-by')`).
3. **Errori.** Un gestore centralizzato, mai stack trace nelle risposte. JSON malformato nel body → **400**
   `{ errore }` in JSON. Rotte `/api/...` inesistenti → **404** `{ errore }` in JSON.
4. **Validazione con zod** del body e di `:id`; **query parametrizzate**; nella pagina EJS i dati si
   stampano con `<%= %>`.

## 5. La pagina web (EJS)

- **`GET /autori/:id`**: nome e nazionalità dell'autore e i libri ordinati per anno (anno, titolo,
  genere). Se l'autore non ha libri, il testo **`Nessun libro in catalogo`**.
- Autore inesistente → **404** con una pagina HTML che contiene il testo **`Autore non trovato`**.
- Un foglio di stile `public/stile.css`, servito all'indirizzo `/stile.css` e collegato nella pagina.

## 6. Consegna

Uno zip della cartella del progetto chiamato **`cognome-nome.zip`**, **senza `node_modules`** e senza il
file del database, con dentro `package.json`, `.env.example` e tutto il codice.

## 7. Valutazione

| Parte | Punti |
|---|---:|
| Autori (elenco e dettaglio con i libri) | 25 |
| Libri (aggiunta ed eliminazione) | 30 |
| Validazione ed errori | 20 |
| Sicurezza | 10 |
| Pagina EJS | 15 |

---

## Allegato: `seme.sql`

```sql
INSERT INTO autori (id, nome, nazionalita) VALUES
  (1, 'Italo Calvino',    'Italiana'),
  (2, 'Elena Ferrante',   'Italiana'),
  (3, 'George Orwell',    'Britannica'),
  (4, 'Isabel Allende',   'Cilena');

INSERT INTO libri (id, titolo, genere, anno, autore_id) VALUES
  (1, 'Le città invisibili',           'romanzo', 1972, 1),
  (2, 'Il sentiero dei nidi di ragno', 'romanzo', 1947, 1),
  (3, 'Lezioni americane',             'saggio',  1988, 1),
  (4, 'L''amica geniale',              'romanzo', 2011, 2),
  (5, 'Storia del nuovo cognome',      'romanzo', 2012, 2),
  (6, '1984',                          'romanzo', 1949, 3);
```