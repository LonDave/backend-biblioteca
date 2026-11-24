// import commonjs
const { EntitySchema } = require("typeorm")

const Autore = new EntitySchema({
    name: "Autore",
    tableName: "autori",
    columns: {
        id: {
            name: "id",
            type: Number,
            primary: true,
            generated: true
        },
        displayName: {
            name: "nome",
            type: String,
            unique: true,
            nullable: false
        },
        nationality: {
            name: "nazionalita",
            type: String,
            nullable: false
        }
    },
    relations: {
        libri: {
            target: "Libro",
            type: "one-to-many",
            inveseSide: "autore"
        }
    }
});

// export
module.exports = { Autore }