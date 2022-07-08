
import { register } from "async-ops";

import { contactsData } from '../../../contactsData';
export const ADD_CONTACTS = 'ADD_CONTACT';

export const service = async request => {
    const url = 'https://localhost:44312/api/contacts/postNewContact';
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
const mockData = () => contactsData;


const mock = request => {
    return Promise.resolve(request)
}

register(ADD_CONTACTS, service, mock);