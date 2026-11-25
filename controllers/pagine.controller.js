// import
const { idSchema } = require("../lib/schemaIdFiltered");
const { autoreConLibri, trovaAutori } = require("../services/autori.service");

// * DONE: controller 
const paginaAutore = async (req, res) => {
    const risultato = idSchema.safeParse(req.params);
    if (!risultato.success) {
        return res.status(400).render("errore", { messaggio: "Id non valido" });
    }

    const autore = await autoreConLibri(risultato.data.id);
    if (!autore) {
        return res.status(404).render("errore", { messaggio: "Autore non trovato" });
    }

    res.render("autore", { autore });
};

const tuttiAutori = async (req, res) => {
    const autori = await trovaAutori();
    res.render("autori", { autori });
};

// export
module.exports = { paginaAutore, tuttiAutori };