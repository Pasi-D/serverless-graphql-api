import { ApolloServer } from "apollo-server-lambda";
import schema from "./schema";
import createContext from "./context";

const server = new ApolloServer({
    schema,
    context: ({ event }) => ({
        headers: event.headers,
        ...createContext()
    })
});

export const main = server.createHandler();
