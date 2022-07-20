import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";

import type PrismaTypes from "@pothos/plugin-prisma/generated";

import db from "../db";
import { Context } from "../context";

const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes;
    Context: Context;
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client: db
    },
    notStrict:
        "Pothos may not work correctly when strict mode is not enabled in tsconfig.json"
});

export default builder;
