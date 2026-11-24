// import
const { Router } = require("express");
const { tuttiAutori, autoriPerId } = require("../controllers/autori.controller");

// router
const router = new Router();

// rotte
router.get("/", tuttiAutori);
router.get("/:id", autoriPerId);

// export
module.exports = { routerAutori: router }