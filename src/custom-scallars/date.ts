import { GraphQLScalarType } from 'graphql';

export const Date : any = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value: any) {
    return new Date(value); // value from the client
    },
    serialize(value: any) {
    return value.getTime(); // value sent to the client
    },

})
