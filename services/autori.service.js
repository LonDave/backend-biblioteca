// import
const { AppDataSource } = require("../config/typeorm.conf");

// * DONE: funzione che permette di eseguire dopo l'initialize  
const repoAutori = () => AppDataSource.getRepository("Autore");

// * DONE: formatta gli autori per mostrare i nomi corretti a schermo
const formattaAutore = (a) => ({
    id: a.id,
    nome: a.displayName,
    nazionalita: a.nationality,
    num_libri: a.libri.length
});

const formattaLibro = (l) => ({
    id: l.id,
    titolo: l.title,
    genere: l.genres,
    anno: l.year
});


// * DONE: funzione per trovare tutti autori e permettere ricerca by filtri
const trovaAutori = async () => {
    const autori = await repoAutori().find({
        relations: { libri: true },
        order: { displayName: "ASC" }          //-> ordine A-Z
    });

    // effettua il map per ogni autore seguendo lo schema del formattaAutore
    return autori.map(formattaAutore);
};

// * DONE: funzione per trovare autori per id
const ricercaAutoreById = async (id) => {
    const autore = await autoreConLibri(id);

    if (!autore) return null;

    return {
        ...formattaAutore(autore),
        libri: autore.libri.map(formattaLibro)
    };
};

// * DONE: autore con i libri per ejs
const autoreConLibri = (id) => {
    return repoAutori().findOne({
        where: { id },
        relations: { libri: true },
        order: { libri: { year: "ASC" } }
    });
};

// export
module.exports = {
    trovaAutori,
    ricercaAutoreById,
    autoreConLibri
}
