
import { register } from "async-ops";
export const DELETE_CONTACTS = 'DELETE_CONTACTS';

export const service = async request => {
    const url = 'https://localhost:44312/api/contacts?' + request.map(x => 'contactIds=' + x.contactId).join("&");
    const options = { method: 'delete' };

    const response = await fetch(url, options);
    const responseData = await response.json();

    return responseData
}

const mock = request => {
    return Promise.resolve(request)
}

register(DELETE_CONTACTS, service, mock);