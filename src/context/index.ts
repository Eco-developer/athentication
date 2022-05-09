import { Context } from "../interfaces";
import { models } from "../models";
import { Request } from 'express';
import 'dotenv/config';

interface RequestInterface {
    req: Request,
}

export const context = ({ req }: RequestInterface) : Context => {
    const token : string | string[] | null  =  req.headers["x-data-token"] || null;
    return { 
        models,
        secret: `${process.env.JWT_SECRET}`, 
        token,
    }
}