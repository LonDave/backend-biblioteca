const express = require("express");
const dotEnv = require("dotenv");
const { join } = require("node:path");
const { AppDataSource } = require("./config/typeorm.conf");
const { PopolaDatabase } = require("./lib/sqlite.db");
const { routerAutori } = require("./routes/autori.route");
const { routerLibri } = require("./routes/libri.route");
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

// * DONE: inizializzo il db e poi lo popolo e faccio il resto 
AppDataSource.initialize()
    .then(async () => {
        await PopolaDatabase(AppDataSource);

        // * DONE: middleware per "visione del body"
        app.use(express.json());

        // * DONE: montaggio rotte
        app.use("/api/autori", routerAutori);
        app.use("/api/libri", routerLibri);

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