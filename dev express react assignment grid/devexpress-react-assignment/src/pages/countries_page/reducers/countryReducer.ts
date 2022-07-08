import { FETCH_COUNTRIES } from "../Services/fetchCountry";
import { ADD_COUNTRY } from "../Services/addCountry";
import { UPDATE_COUNTRY } from "../Services/updateContact";
import { DELETE_COUNTRY } from "../Services/deleteCountry";
import notify from 'devextreme/ui/notify';
import { actionTypes as asyncTypes, isAsyncOperation, isAsyncComplete } from "async-ops";
import * as utils from "utils";
export const initialState = {
    countryList: [],
    isLoading: false
}
export const countryReducer = (state = initialState, action) => {
    switch (action.type) {

        case asyncTypes.COMPLETE:
            if (isAsyncComplete(FETCH_COUNTRIES)(action))
                return {
                    ...state,
                    countryList: [...action.response],
                    isLoading: false
                }

            if (isAsyncComplete(ADD_COUNTRY)(action))
                return {
                    ...state,
                    countryList: [...state.countryList, action.response],
                    isLoading: false
                }
            if (isAsyncComplete(UPDATE_COUNTRY)(action)) {
                const updatedContact = action.response;
                const index = state.countryList.findIndex(x => x.id === updatedContact.id);
                return {
                    ...state,
                    countryList: [
                        ...state.countryList.slice(0, index),
                        { ...updatedContact },
                        ...state.countryList.slice(index + 1)
                    ],
                    isLoading: false
                }
            }
            if (isAsyncComplete(DELETE_COUNTRY)(action)) {
                const keys = action.response;
                return {
                    ...state,
                    countryList: [...state.countryList.filter(x => !keys.includes(x))],
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