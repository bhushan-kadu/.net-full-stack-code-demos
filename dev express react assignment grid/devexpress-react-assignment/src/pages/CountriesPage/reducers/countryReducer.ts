import { FETCH_COUNTRIES } from "../Services/getCountry";
import { ADD_COUNTRY } from "../Services/addCountry";
import { UPDATE_COUNTRY } from "../Services/updateContact";
import { DELETE_COUNTRY } from "../Services/deleteCountry";
import { actionTypes as asyncTypes, isAsyncOperation, isAsyncComplete } from "async-ops";
import * as utils from "utils";
export const initialState = {
    countryList: []
}
export const countryReducer = (state = initialState, action) => {
    switch (action.type) {
        case asyncTypes.OPERATION:
        case asyncTypes.FAILURE:
        case asyncTypes.COMPLETE:
            if (isAsyncComplete(FETCH_COUNTRIES)(action))
                return {
                    ...state,
                    countryList: [...action.response]
                }

            if (isAsyncComplete(ADD_COUNTRY)(action))
                return {
                    ...state,
                    countryList: [...state.countryList, action.response]
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
                    ]
                }
            }
            if (isAsyncComplete(DELETE_COUNTRY)(action)) {
                const keys = action.response;
                return {
                    ...state,
                    countryList: [...state.countryList.filter(x => !keys.includes(x))]
                }
            }

            return { ...state }
        default:
            return { ...state }

    }
}