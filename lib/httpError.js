
class HttpError extends Error {
    constructor(status, messaggio) {
        this.name = "HttpError",
            this.status = status;
    }
}

// export
module.exports = { HttpError }