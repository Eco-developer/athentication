import express, { Application } from "express";
import { ApolloServer,  } from "apollo-server-express";
import cors from "cors";

class Server {
    private app : Application;
    private apolloServer : any;
    constructor() {
        this.app = express();
        this.apolloServer = new ApolloServer({typeDefs: '', resolvers: {}});
    }

    middlewares() {
        this.app.use(cors());
        this.apolloServer.applyMiddleware(this.app);
    }

    listen() {
        this.app.listen({port: 4000}, ()=>{
            console.log('listening on port 4000');
        })
    }
}

export const server = new Server();