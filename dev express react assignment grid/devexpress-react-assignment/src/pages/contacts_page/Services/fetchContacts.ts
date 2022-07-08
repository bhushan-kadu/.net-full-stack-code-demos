
import { register } from "async-ops";

import { contactsData } from '../../../contactsData';
export const FETCH_CONTACTS = 'FETCH_CONTACTS';

export const service = async request => {
    const url = 'https://localhost:44312/api/contacts';
    const options = { method: 'GET' };

    const response = await fetch(url, options);
    const responseData = await response.json();

    return responseData
}
const mockData = () => contactsData;


const mock = request => {
    return Promise.resolve(mockData())
}

register(FETCH_CONTACTS, service, mock);