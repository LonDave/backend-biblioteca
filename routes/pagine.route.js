// import
const { Router } = require("express");
const { paginaAutore, tuttiAutori } = require("../controllers/pagine.controller");

// creazione router
const router = new Router();

// * DONE: rotte
router.get("/", tuttiAutori)
router.get("/:id", paginaAutore);

// export
module.exports = { routerPagine: router };