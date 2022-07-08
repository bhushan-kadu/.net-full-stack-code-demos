import * as utils from "utils";
import { FETCH_CONTACTS } from "../Services/getContacts";
import { ADD_CONTACTS } from "../Services/addContact";
import { UPDATE_CONTACTS } from "../Services/updateContact";
import { DELETE_CONTACTS } from "../Services/deleteContact";
import { actionTypes as asyncTypes, isAsyncOperation, isAsyncComplete } from "async-ops";
import { GET_STATES } from "../Services/GetStatesFromCountry";
export const initialState = {
    contactList: [],
    states: []
}
export const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case asyncTypes.OPERATION:
        case asyncTypes.FAILURE:
        case asyncTypes.COMPLETE:
            if (isAsyncComplete(FETCH_CONTACTS)(action))
                return {
                    ...state,
                    contactList: [...action.response]
                }
            if (isAsyncComplete(GET_STATES)(action))
                return {
                    ...state,
                    states: action.response
                }
            if (isAsyncComplete(ADD_CONTACTS)(action))
                return {
                    ...state,
                    contactList: [...state.contactList, action.response]
                }
            if (isAsyncComplete(UPDATE_CONTACTS)(action)) {
                const updatedContact = action.response;
                const index = state.contactList.findIndex(x => x.id === updatedContact.id);
                return {
                    ...state,
                    contactList: [
                        ...state.contactList.slice(0, index),
                        { ...updatedContact },
                        ...state.contactList.slice(index + 1)
                    ]
                }
            }
            if (isAsyncComplete(DELETE_CONTACTS)(action)) {
                const keys = action.response;
                return {
                    ...state,
                    contactList: [...state.contactList.filter(x => !keys.includes(x))]
                }
            }

            return { ...state }
        default:
            return { ...state }

    }
}