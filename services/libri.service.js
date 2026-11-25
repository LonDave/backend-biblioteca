// import
const { AppDataSource } = require("../config/typeorm.conf");
const { HttpError } = require("../lib/httpError");

// repository => astrazione possibile grazie a ORM
const repoLibri = () => AppDataSource.getRepository("Libro");
const repoAutori = () => AppDataSource.getRepository("Autore");

// * DONE: crea un libro
const CreaLibroService = async (body) => {
    const autore = await repoAutori().findOneBy({ id: body.autore_id });

    if (!autore) {
        throw new HttpError(400, "Dati non validi", [{ campo: "autore_id", messaggio: "Autore inesistente" }]);
    };

    const esiste = await repoLibri().findOneBy({ title: body.titolo, autore: { id: body.autore_id } });

    if (esiste) {
        throw new HttpError(409, "Libro già presente");
    };

    const libro = repoLibri().create({
        title: body.titolo,
        genres: body.genere,
        year: body.anno,
        autore: { id: body.autore_id }
    });

    const salvato = await repoLibri().save(libro);
    return { id: salvato.id, titolo: salvato.title, genere: salvato.genres, anno: salvato.year, autore_id: body.autore_id };
};

// * DONE: funzione per trovare libro singolo da ID
const TrovaLibroService = async (id) => {
    return repoLibri().findOneBy({ id });
};

// * DONE: funzione per eliminare libro singolo da ID
const EliminaLibroService = async (id) => {
    return repoLibri().delete({ id });
};

// export
module.exports = {
    CreaLibroService,
    TrovaLibroService,
    EliminaLibroService
}