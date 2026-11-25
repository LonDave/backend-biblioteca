// import
const { Router } = require("express");
const { CreaLibroController, EliminaLibroController } = require("../controllers/libri.controller");
const { apiKeyMiddleware } = require("../middlewares/apiKey.middleware");

// creazione router
const router = new Router();

router.use(apiKeyMiddleware);

// * DONE: rotte
router.post("/", CreaLibroController);
router.delete("/:id", EliminaLibroController);

// export
module.exports = { routerLibri: router }