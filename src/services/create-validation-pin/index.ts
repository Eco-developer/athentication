import { v4 as uuid } from 'uuid';

export const createValidationPin = () => {
    return uuid().slice(0, 8);
}