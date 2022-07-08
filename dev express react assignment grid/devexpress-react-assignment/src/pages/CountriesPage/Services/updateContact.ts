
import { register } from "async-ops";
export const UPDATE_COUNTRY = 'UPDATE_COUNTRY';

export const service = async request => {
    return request;
}

const mock = request => {
    return Promise.resolve(request);
}

register(UPDATE_COUNTRY, service, mock);