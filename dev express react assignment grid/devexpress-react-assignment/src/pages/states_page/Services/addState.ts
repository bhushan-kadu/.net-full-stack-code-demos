
import { register } from "async-ops";
export const ADD_STATE = 'ADD_STATE';

export const service = async request => {
    const url = 'https://localhost:44312/api/state/PostNewState';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    return responseData
}

const mock = request => {
    return Promise.resolve(request)
}

register(ADD_STATE, service, mock);