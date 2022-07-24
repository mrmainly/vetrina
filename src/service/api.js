import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookie from "js-cookie";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://xn--80adjmzqn.xn--p1ai/api/v1/",
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

    tagTypes: ["Products", "Provider", "Markets"],

    endpoints: () => ({}),
});
