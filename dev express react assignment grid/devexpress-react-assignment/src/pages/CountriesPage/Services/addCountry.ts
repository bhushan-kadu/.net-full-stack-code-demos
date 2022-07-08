
import { register } from "async-ops";
export const ADD_COUNTRY = 'ADD_COUNTRY';

export const service = async request => {
    return request;
}

const mock = request => {
    return Promise.resolve(request)
}

register(ADD_COUNTRY, service, mock);