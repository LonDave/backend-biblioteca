// import
const { z } = require("zod");
const { idSchema } = require("../lib/schemaIdFiltered");
const { HttpError } = require("../lib/httpError");
const { trovaAutori, ricercaAutoreById } = require("../services/autori.service");

// * DONE: schema autore completo
const autoriSchema = z.object({
    id: z.coerce.number().positive(),
    name: z.string().trim().min(1, "inserire un testo").max(60),
    nationality: z.string().trim()
});

// * DONE: schema filtrato senza ID
const autoriSchemaFiltered = autoriSchema.omit({ id: true });

// * DONE: funzione per trovare tutti gli autori, non servono controlli di zod
const tuttiAutori = async (req, res) => {
    const autori = await trovaAutori();
    res.status(200).json(autori);
}

// * DONE: funzione per trovare tutti autori per ID
const autoriPerId = async (req, res) => {
    const risultato = z.safeParse(idSchema, req.params);        //-> controllo sullo schema di ID

    if (!risultato.success) {
        throw new HttpError(400, "Input richiesto numero");
    }

    const autore = await ricercaAutoreById(risultato.data.id);

    if (!autore) {
        throw new HttpError(404, "Autore non trovato");
    }

    res.status(200).json(autore);
}

// export
module.exports = {
    tuttiAutori,
    autoriPerId
}