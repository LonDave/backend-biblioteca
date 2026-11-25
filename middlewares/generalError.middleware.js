// import
const { HttpError } = require("../lib/httpError");

// * DONE: middlware centrale che gestisce gli errori
const HttpErrorMiddleware = (err, req, res, next) => {
    if (err instanceof HttpError) {
        const body = { errore: err.message };
        if (err.dettagli) body.dettagli = err.dettagli;
        return res.status(err.statusCode).json(body);
    };

    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ errore: "JSON non valido" });
    };

    console.error(err);
    res.status(500).json({ errore: "Errore interno al server" });
};

// export
module.exports = { HttpErrorMiddleware }