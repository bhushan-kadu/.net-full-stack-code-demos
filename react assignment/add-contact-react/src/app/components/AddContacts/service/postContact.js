import { register } from "async-ops";
export const ADD_CONTACT = "ADD_CONTACT";

export const service = async contactObj => {
    const url = "https://localhost:44312/api/contacts"
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(contactObj)
    }

    const response = await window.fetch(url, options)
    return response;
}


const mock = () => Promise.resolve("Contact added Succesfully!");
register(ADD_CONTACT, service, mock)
