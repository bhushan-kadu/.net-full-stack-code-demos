
import { register } from "async-ops";
export const DELETE_STATE = 'DELETE_STATE';

export const service = async request => {
    const url = 'https://localhost:44312/api/state?' + request.map(x => 'stateIds=' + x.stateId).join("&");
    const options = { method: 'delete' };

    const response = await fetch(url, options);
    const responseData = await response.json();

    return responseData
}

const mock = request => {
    return Promise.resolve(request)
}

register(DELETE_STATE, service, mock);