// import 
const { EntitySchema } = require("typeorm")

const Libro = new EntitySchema({
    name: "Libro",
    tableName: "libri",
    columns: {
        id: {
            name: "id",
            type: Number,
            primary: true,
            generated: true
        },
        title: {
            name: "titolo",
            type: String,
            nullable: false
        },
        genres: {
            name: "genere",
            type: String,
            nullable: false
        },
        year: {
            name: "anno",
            type: Number,
            nullable: false
        }
    },
    relations: {
        autore: {
            target: "Autore",
            type: "many-to-one",
            joinColumn: {
                name: "autore_id"
            }
        }
    },
    uniques: [{
        name: "unico_titolo_per_autore",
        columns: ["autore", "title"]                //-> sempre il nome delle relazione e nome colonna
    }]
});

// export
module.exports = { Libro }