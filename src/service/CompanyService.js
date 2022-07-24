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
        getMarketsIdAnomim: build.query({
            query: ({ id }) => `markets/items/?market=${id}`,
        }),
        getMarketsItems: build.query({
            query: ({ id }) => `markets/items/?market=${id}`,
            providesTags: (result = []) => [
                ...result.results.map(({ id }) => ({ type: "Posts", id })),
                { type: "Posts", id: "LIST" },
            ],
        }),
        getMarketsMe: build.query({
            query: ({ sort, filterName }) =>
                `markets/me/${sort ? `?tags=${sort}` : ""}${
                    filterName ? `${sort ? "&" : "?"}search=${filterName}` : ""
                } `,
        }),
        CreateMarketsMe: build.mutation({
            query(body) {
                return {
                    url: `markets/me/`,
                    method: "POST",
                    body,
                };
            },
        }),
        CreateProductMe: build.mutation({
            query({ id, ...body }) {
                return {
                    url: `markets/me/${id}/items/`,
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: [{ type: "Products" }],
        }),
        PutCompanyMe: build.mutation({
            query({ id, ...body }) {
                return {
                    url: `markets/me/${id}/`,
                    method: "PUT",
                    body,
                };
            },
        }),
        DeleteCompanyMe: build.mutation({
            query({ id }) {
                return {
                    url: `markets/me/${id}/`,
                    method: "DELETE",
                };
            },
        }),
    }),
});

export const {
    useGetMarketsQuery,
    useGetMarketsIdQuery,
    useGetMarketsItemsQuery,
    useGetMarketsIdAnomimQuery,
    useGetMarketsMeQuery,
    useCreateMarketsMeMutation,
    useCreateProductMeMutation,
    usePutCompanyMeMutation,
    useDeleteCompanyMeMutation,
} = products;
