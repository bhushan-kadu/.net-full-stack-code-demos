
import { register } from "async-ops";
export const UPDATE_STATES = 'UPDATE_STATES';

export const service = async request => {
    return request;
}

const mock = request => {
    return Promise.resolve(request);
}

register(UPDATE_STATES, service, mock);