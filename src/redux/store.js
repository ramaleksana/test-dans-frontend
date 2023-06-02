import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobs from "./reducers/jobs";
import auth from "./reducers/auth";

const reducers = combineReducers({
    auth,
    jobs,
});

const reduxStore = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {},
            serializableCheck: false,
        }),
});

export default reduxStore;
