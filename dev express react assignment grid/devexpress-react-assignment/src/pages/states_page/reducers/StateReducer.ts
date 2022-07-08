import { FETCH_STATES } from "../Services/fetchStates";
import { ADD_STATE } from "../Services/addState";
import { UPDATE_STATES } from "../Services/updateState";
import { DELETE_STATE } from "../Services/deleteState";
import notify from 'devextreme/ui/notify';
import { actionTypes as asyncTypes, isAsyncOperation, isAsyncComplete } from "async-ops";
export const initialState = {
    stateList: [],
    isLoading: false
}
export const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case asyncTypes.COMPLETE:
            if (isAsyncComplete(FETCH_STATES)(action))
                return {
                    ...state,
                    stateList: [...action.response],
                    isLoading: false
                }

            if (isAsyncComplete(ADD_STATE)(action))
                return {
                    ...state,
                    stateList: [...state.stateList, action.response],
                    isLoading: false
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
                    ],
                    isLoading: false
                }
            }
            if (isAsyncComplete(DELETE_STATE)(action)) {
                const keys = action.response;
                return {
                    ...state,
                    stateList: [...state.stateList.filter(x => !keys.includes(x))],
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