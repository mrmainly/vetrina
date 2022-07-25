import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookie from "js-cookie";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_KEY,
    prepareHeaders: (headers, { getState }) => {
        const token = cookie.get("jwttoken");
        if (token) {
            headers.set("authorization", `Token ${token}`);
        }
        return headers;
    },
});

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
    reducerPath: "splitApi",

    baseQuery: baseQuery,

    tagTypes: ["Products", "Markets", "Markets_Detail"],

    endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
    endpoints: () => ({
        getPost: () => "test",
    }),
});
