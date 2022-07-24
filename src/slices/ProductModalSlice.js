import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    open: false,
};

export const productModalSlice = createSlice({
    name: "productModal",
    initialState,
    reducers: {
        openAndAdded(state, action) {
            state.open = true;
            state.data = action.payload;
        },
        close(state, action) {
            state.open = false;
            state.data = {};
        },
    },
});

export default productModalSlice.reducer;
