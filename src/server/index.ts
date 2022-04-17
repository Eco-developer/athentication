import express, { Application } from "express";
import cors from "cors";
import { schema } from "../schema";
import { ApolloServer, ExpressContext,  } from "apollo-server-express";

class Server {
    private app : Application;
    private apolloServer : ApolloServer<ExpressContext>;
    constructor() {
        this.app = express();
        this.apolloServer = new ApolloServer({typeDefs: schema, resolvers: {}});
        this.middlewares();
    }

    async middlewares() {
        this.app.use(cors());
        await this.apolloServer.start();
        this.apolloServer.applyMiddleware({app: this.app, path: "/apollo-server"});
    }

    listen() {
        this.app.listen({port: 4000}, ()=>{
            console.log('listening on port 4000');
        })
    }
}

export const server = new Server();