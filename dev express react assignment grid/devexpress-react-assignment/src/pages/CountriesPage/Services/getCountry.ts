
import { register } from "async-ops";
import * as utils from 'utils'
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';

export const service = async request => {
    const url = 'https://localhost:44312/api/country';
    const options = { method: 'GET' };

    const response = await fetch(url, options);
    const responseData = await response.json();

    return responseData
}
const mockData = () => utils.countryIdNameArray;


const mock = request => {
    return Promise.resolve(mockData())
}

register(FETCH_COUNTRIES, service, mock);