import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import createSagaMiddleware from 'redux-saga';
import { saga as asyncSaga } from 'async-ops';
import { contactReducer } from "../reducers/ContactReducer";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        form: formReducer,
        contactReducer
    },
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(asyncSaga)