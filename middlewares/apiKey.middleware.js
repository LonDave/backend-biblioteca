// import 
const { HttpError } = require("../lib/httpError");

// * DONE: middleware di autenticazione
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {
        throw new HttpError(401, "ApiKey mancante o non valida");
    };

    next();
}

// export
module.exports = { apiKeyMiddleware }