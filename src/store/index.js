import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";
// import productReducer from "../reducer/product_slice";
import { api } from "../service/api";
import productModalSlice from "../slices/ProductModalSlice";

const rootReducer = combineReducers({
    // productReducer,
    [api.reducerPath]: api.reducer,
    productModalSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    });
};
