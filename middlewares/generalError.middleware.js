// import
const { HttpError } = require("../lib/httpError");

const HttpErrorMiddleware = (err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ error: err.message });
    };

    console.log(err);
    res.status(500).json({ error: "Errore interno al server" });
}

module.exports = {
    HttpErrorMiddleware
}