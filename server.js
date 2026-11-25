const express = require("express");
const dotEnv = require("dotenv");
const { join } = require("node:path");
const { AppDataSource } = require("./config/typeorm.conf");
const { PopolaDatabase } = require("./lib/sqlite.db");
const { routerAutori } = require("./routes/autori.route");
const { routerLibri } = require("./routes/libri.route");
const { routerPagine } = require("./routes/pagine.route");
const { HttpErrorMiddleware } = require("./middlewares/generalError.middleware");

// conf variabili ambiente
dotEnv.config({
    path: join(__dirname, ".env")
});

// express
const app = express();
const PORT = process.env.PORT ?? 3000;

// evita di comunicare negli header che si sta usando node
app.disable("x-powered-by");
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "public")));  // serve /stile.css

// * DONE: inizializzo il db e poi lo popolo e faccio il resto 
AppDataSource.initialize()
    .then(async () => {
        await PopolaDatabase(AppDataSource);

        // * DONE: middleware per "visione del body"
        app.use(express.json());

        // * DONE: montaggio rotte
        app.use("/api/autori", routerAutori);
        app.use("/api/libri", routerLibri);

        // * DONE: rotte per ejs
        app.use("/autori", routerPagine)

        // in caso di rotte mancanti
        app.use("/api", (req, res) => {
            res.status(404).json({ errore: "Risorsa non trovata" });
        });

        // * DONE: gestore generale err
        app.use(HttpErrorMiddleware)

        // listen
        app.listen(PORT, () => {
            console.log(`Server live on port: ${PORT}`);
        });

    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    })