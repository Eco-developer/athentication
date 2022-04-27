import { Context } from "../interfaces";
import { models } from "../models";
import 'dotenv/config';

export const context: Context = {
    models,
    secret: `${process.env.JWT_SECRET}`
}