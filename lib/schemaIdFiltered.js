// import
const { z } = require("zod");

// schema dedicato all'id per multi
const idSchema = z.object({
    id: z.coerce.number().positive()
});

// export
module.exports = { idSchema }