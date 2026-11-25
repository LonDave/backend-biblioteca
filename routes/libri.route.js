// import
const { Router } = require("express");
const { CreaLibroController, EliminaLibroController } = require("../controllers/libri.controller");

// creazione router
const router = new Router();

// * DONE: rotte
router.post("/", CreaLibroController);
router.delete("/:id", EliminaLibroController);

// export
module.exports = { routerLibri: router }