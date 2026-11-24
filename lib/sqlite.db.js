// import
const { readFileSync } = require("node:fs");
const path = require("node:path");

const SEED = path.join(__dirname, "..", "seeds", "SEED.sql");

async function PopolaDatabase(dataSource) {
    await dataSource.transaction(async (manager) => {
        const autori = await manager.count("Autore");
        const libri = await manager.count("Libro");

        if (autori !== 0 || libri !== 0) {
            return console.log("Database già popolato");
        }

        const sql = readFileSync(SEED, "utf-8");

        const istruzioni = sql
            .split(";")
            .map((istruzione) => istruzione.trim())
            .filter(Boolean);

        for (const istruzione of istruzioni) {
            await manager.query(istruzione);
        }
    });
}

// export 
module.exports = { PopolaDatabase }