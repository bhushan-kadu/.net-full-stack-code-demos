
import { register } from "async-ops";
import * as utils from "utils";
export const GET_STATES = 'GET_STATES';
export const service = async request => {
    const url = 'https://localhost:44312/api/state?CountryName=' + request;
    const options = {
        method: 'GET',
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    return responseData

}
const mockData = () => ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal"];

const mock = request => {
    return Promise.resolve(mockData())
}

register(GET_STATES, service, mock);