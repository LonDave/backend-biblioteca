// import
const { AppDataSource } = require("../config/typeorm.conf");

// * DONE: funzione che permette di eseguire dopo l'initialize  
const repoAutori = () => AppDataSource.getRepository("Autore");

// * DONE: funzione per trovare tutti autori e permettere ricerca by filtri
const trovaAutori = (filtri = {}) => {
    return repoAutori().find({
        where: filtri,
        order: { displayName: "ASC" }          //-> ordine A-Z
    });
};

// * DONE: funzione per trovare autori per id
const ricercaAutoreById = (id) => {
    return repoAutori().findOneBy({ id });
}

// export
module.exports = {
    trovaAutori,
    ricercaAutoreById
}
