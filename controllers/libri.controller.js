// import 
const { z } = require("zod");
const { idSchema } = require("../lib/schemaIdFiltered");
const { HttpError } = require("../lib/httpError");
const { CreaLibroService, TrovaLibroService, EliminaLibroService } = require("../services/libri.service");

// * DONE: schema libro completo
const LibriSchema = z.object({
    id: z.number().positive(),
    titolo: z.string().min(1, "Inserire un titolo").trim().max(100),
    genere: z.enum(["romanzo", "saggio", "poesia", "racconti"], "Genere non valido"),
    anno: z.coerce.number().positive().min(1200).max(2026),
    autore_id: z.number().int().positive("Autore intero positivo")
}).strict();

// * DONE: schema filtrato senza ID
const LibriSchemaFiltered = LibriSchema.omit({ id: true });

// *DONE: crea libro
const CreaLibroController = async (req, res) => {
    const risultato = z.safeParse(LibriSchemaFiltered, req.body);

    if (!risultato.success) {
        throw new HttpError(400, "Body non valido", [{ campo: "body", messaggio: "Body inviato non valido" }]);
    };

    const data = await CreaLibroService(risultato.data);
    res.status(201).json(data);
}

// *DONE: elimina libro
const EliminaLibroController = async (req, res) => {
    const risultato = z.safeParse(idSchema, req.params);

    if (!risultato.success) {
        throw new HttpError(400, "Body non valido")
    };

    const libro = await TrovaLibroService(risultato.data.id);

    if (!libro) {
        throw new HttpError(404, "Libro non esistente");
    };

    await EliminaLibroService(risultato.data.id);
    res.sendStatus(204);
};

// export
module.exports = {
    CreaLibroController,
    EliminaLibroController
}