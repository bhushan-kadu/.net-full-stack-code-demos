
import { register } from "async-ops";
export const DELETE_COUNTRY = 'DELETE_COUNTRY';

export const service = async request => {
    return request;
}

const mock = request => {
    return Promise.resolve(request)
}

register(DELETE_COUNTRY, service, mock);