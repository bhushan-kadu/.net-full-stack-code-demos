import { createSlice } from "@reduxjs/toolkit";
import { actionTypes as asyncTypes, isAsyncOperation, isAsyncComplete, isAsyncFailure } from 'async-ops';
import { ADD_CONTACT } from "../components/AddContacts/service/postContact";

export const CLOSE_ALERT_DIALOG = "CLOSE_ALERT_DIALOG";
const initialState = { setOpenSuccessDlg: false }
export const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case asyncTypes.OPERATION:
        case asyncTypes.COMPLETE:
        case asyncTypes.FAILURE:
            if (isAsyncComplete(ADD_CONTACT)(action)) {
                if (action.response.status === 200) {
                    return state = { ...state, setOpenSuccessDlg: true }
                } else {
                    return state = { ...state, setOpenSuccessDlg: false }
                }
            }
            return state;

        case CLOSE_ALERT_DIALOG:
            state = { ...state, setOpenSuccessDlg: false }
            return state

        default:
            return state;
    }

}