
import { register } from "async-ops";
export const DELETE_COUNTRY = 'DELETE_COUNTRY';

export const service = async request => {
    const url = 'https://localhost:44312/api/country?' + request.map(x => 'countryIds=' + x.countryId).join("&");
    const options = { method: 'delete' };

    const response = await fetch(url, options);
    const responseData = await response.json();

    return responseData
}

const mock = request => {
    return Promise.resolve(request)
}

register(DELETE_COUNTRY, service, mock);