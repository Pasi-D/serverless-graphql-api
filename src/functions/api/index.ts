import { handlerPath } from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: "post",
                path: "/graphql",
                cors: true
            }
        },
        {
            http: {
                method: "get",
                path: "/graphql",
                cors: true
            }
        }
    ]
};
