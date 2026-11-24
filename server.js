const express = require("express");
const dotEnv = require("dotenv");
const { join } = require("node:path");
const { AppDataSource } = require("./config/typeorm.conf");
const { PopolaDatabase } = require("./lib/sqlite.db");
const { routerAutori } = require("./routes/autori.route");
const { HttpErrorMiddleware } = require("./middlewares/generalError.middleware");

dotEnv.config({
    path: join(__dirname, ".env")
});

const app = express();
const PORT = process.env.PORT ?? 3000;

AppDataSource.initialize()
    .then(async () => {
        await PopolaDatabase(AppDataSource);

        // * DONE: middleware per "visione del body"
        app.use(express.json());

        // * DONE: montaggio rotte
        app.use("/api/autori", routerAutori);

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