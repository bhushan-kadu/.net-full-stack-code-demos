
import { register } from "async-ops";
export const UPDATE_CONTACTS = 'UPDATE_CONTACTS';

export const service = async request => {
    const url = 'https://localhost:44312/api/contacts/PutContact';
    const options = {
        method: 'put',
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
    return Promise.resolve(request);
}

register(UPDATE_CONTACTS, service, mock);