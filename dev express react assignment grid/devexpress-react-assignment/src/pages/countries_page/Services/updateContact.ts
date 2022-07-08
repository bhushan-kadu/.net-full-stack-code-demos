
import { register } from "async-ops";
export const UPDATE_COUNTRY = 'UPDATE_COUNTRY';

export const service = async request => {
    const url = 'https://localhost:44312/api/country/PutCountry';
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

register(UPDATE_COUNTRY, service, mock);