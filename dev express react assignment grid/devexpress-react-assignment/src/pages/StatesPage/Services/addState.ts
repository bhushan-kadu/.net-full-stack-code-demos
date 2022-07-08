
import { register } from "async-ops";
export const ADD_STATE = 'ADD_STATE';

export const service = async request => {
    return request;
}

const mock = request => {
    return Promise.resolve(request)
}

register(ADD_STATE, service, mock);