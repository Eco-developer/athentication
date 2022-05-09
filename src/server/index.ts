import cors from "cors";
import express, { Application } from "express";
import expressPlayground  from 'graphql-playground-middleware-express';
import { 
    ApolloServer, 
    ExpressContext 
} from "apollo-server-express";
import { resolvers } from '../resolvers/index';
import { schema } from "../schema";
import { 
    connectDb 
} from "../models/index";
import { context } from '../context/index';

import 'dotenv/config';

class Server {
    private app : Application;
    private apolloServer : ApolloServer<ExpressContext>;
    private port : string | number = process.env.PORT || 4000;
    constructor() {
        this.app = express();
        this.apolloServer = new ApolloServer(
            {
                typeDefs: schema, 
                context,
                resolvers,
            }
        );
        this.middlewares();
    }

    async middlewares() {
        this.app.use(cors());
        await this.apolloServer.start();
        this.apolloServer.applyMiddleware({app: this.app, path: "/apollo-server"});
        this.app.use('/playground', expressPlayground({ endpoint: '/apollo-server' }))
    }

    async listen() {
        await connectDb();
        this.app.listen({port: this.port}, ()=>{
            console.log(`listening on port ${this.port}`);
        });
    }
}

export const server = new Server();