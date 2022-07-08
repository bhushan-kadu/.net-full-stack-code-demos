import * as utils from "utils";
import notify from 'devextreme/ui/notify';
import { FETCH_CONTACTS } from "../Services/fetchContacts";
import { ADD_CONTACTS } from "../Services/addContact";
import { UPDATE_CONTACTS } from "../Services/updateContact";
import { DELETE_CONTACTS } from "../Services/deleteContact";
import { actionTypes as asyncTypes, isAsyncOperation, isAsyncComplete, isAsyncFailure } from "async-ops";
import { GET_STATES } from "../Services/GetStates";
export const initialState = {
    contactList: [],
    states: [],
    isLoading: false
}
export const contactReducer = (state = initialState, action) => {
    switch (action.type) {

        case asyncTypes.COMPLETE:
            if (isAsyncComplete(FETCH_CONTACTS)(action))
                return {
                    ...state,
                    contactList: [...action.response],
                    isLoading: false
                }
            if (isAsyncComplete(GET_STATES)(action))
                return {
                    ...state,
                    states: action.response,
                    isLoading: false
                }
            if (isAsyncComplete(ADD_CONTACTS)(action))
                return {
                    ...state,
                    isLoading: false
                }
            if (isAsyncComplete(UPDATE_CONTACTS)(action)) {
                return {
                    ...state,
                    isLoading: false
                }
            }
            if (isAsyncComplete(DELETE_CONTACTS)(action)) {
                const keys = action.response;
                return {
                    ...state,
                    isLoading: false
                }
            }
            return { ...state }

        case asyncTypes.OPERATION:
            return {
                ...state,
                isLoading: true
            }

        case asyncTypes.FAILURE:
            notify(action.response ? action.response : "Please Check API", "error", 3000)
            return {
                ...state,
                isLoading: false
            }
        default:
            return { ...state }

    }
}