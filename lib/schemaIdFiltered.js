// import
const { z } = require("zod");

// schema dedicato all'id per multi
const idSchema = z.object({
    id: z.coerce.number().int().positive()
});

// export
module.exports = { idSchema }