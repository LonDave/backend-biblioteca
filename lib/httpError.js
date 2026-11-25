// * DONE: classe di errore che estende la classe Error
class HttpError extends Error {
    constructor(status, message, dettagli) {
        super(message)
        this.name = "HttpError",
        this.statusCode = status;
        this.dettagli = dettagli;
    }
}

// export
module.exports = { HttpError }