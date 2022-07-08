import { FETCH_STATES } from "../Services/getStates";
import { ADD_STATE } from "../Services/addState";
import { UPDATE_STATES } from "../Services/updateState";
import { DELETE_STATE } from "../Services/deleteState";
import { actionTypes as asyncTypes, isAsyncOperation, isAsyncComplete } from "async-ops";
export const initialState = {
    stateList: []
}
export const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case asyncTypes.OPERATION:
        case asyncTypes.FAILURE:
        case asyncTypes.COMPLETE:
            if (isAsyncComplete(FETCH_STATES)(action))
                return {
                    ...state,
                    stateList: [...action.response]
                }

            if (isAsyncComplete(ADD_STATE)(action))
                return {
                    ...state,
                    stateList: [...state.stateList, action.response]
                }
            if (isAsyncComplete(UPDATE_STATES)(action)) {
                const updatedContact = action.response;
                const index = state.stateList.findIndex(x => x.id === updatedContact.id);
                return {
                    ...state,
                    stateList: [
                        ...state.stateList.slice(0, index),
                        { ...updatedContact },
                        ...state.stateList.slice(index + 1)
                    ]
                }
            }
            if (isAsyncComplete(DELETE_STATE)(action)) {
                const keys = action.response;
                return {
                    ...state,
                    stateList: [...state.stateList.filter(x => !keys.includes(x))]
                }
            }

            return { ...state }
        default:
            return { ...state }

    }
}