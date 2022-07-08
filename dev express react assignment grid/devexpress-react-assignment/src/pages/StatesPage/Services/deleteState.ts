
import { register } from "async-ops";
export const DELETE_STATE = 'DELETE_STATE';

export const service = async request => {
    return request;
}

const mock = request => {
    return Promise.resolve(request)
}

register(DELETE_STATE, service, mock);