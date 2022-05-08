import { models } from "../models";

export interface Context {
    models: typeof models,
    secret: string,
    token: string | string[] | null,
}