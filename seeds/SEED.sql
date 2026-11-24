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