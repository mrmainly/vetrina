import { api } from "./api";

export const products = api.injectEndpoints({
    endpoints: (build) => ({
        getMarkets: build.query({
            query: ({ sort, filterName }) =>
                `markets/${sort ? `?tags=${sort}` : ""}${
                    filterName ? `${sort ? "&" : "?"}search=${filterName}` : ""
                } `,
        }),
        getMarketsId: build.query({
            query: ({ id }) => `markets/me/${id}/`,
        }),
        getMarketsItems: build.query({
            query: ({ id }) => `markets/items/?market=${id}`,
        }),
    }),
});

export const {
    useGetMarketsQuery,
    useGetMarketsIdQuery,
    useGetMarketsItemsQuery,
} = products;
