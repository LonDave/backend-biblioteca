// import
const { z } = require("zod");
const { idSchema } = require("../lib/schemaIdFiltered");
const { HttpError } = require("../lib/httpError")

const autoriSchema = z.object({
    id: z.coerce.number().positive(),
    name: z.string().trim().min(1, "inserire un testo").max(60),
    nationality: z.string().trim()
});

const autoriSchemaFiltered = autoriSchema.omit({ id: true });

const tuttiAutori = async (req, res) => {
    const risultato = z.safeParse(autoriSchemaFiltered, req.query);

    if (!risultato.success) {
        throw new HttpError(400, "Errore di ricerca")
    }

    const autore = await trovaAutori(risultato.data);
    res.status(200).json(autore);
}

const autoriPerId = async (req, res) => {
    const risultato = z.safeParse(idSchema, req.params);

    if (!risultato.success) {
        throw new HttpError(400, "Input number required");
    }

    const autore = await ricercaAutoreById(risultato.data.id);

    if (!autore) {
        throw new HttpError(400, "Autore non trovato");
    }

    res.status(200).json(autore);
}

module.exports = {
    tuttiAutori,
    autoriPerId
}