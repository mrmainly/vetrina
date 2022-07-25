import { api } from "./api";

export const products = api.injectEndpoints({
    endpoints: (build) => ({
        getMarkets: build.query({
            query: ({ sort, filterName, currentPage }) =>
                `markets/${
                    sort ? `${filterName ? "&" : "?"}tags=${sort}` : ""
                }${
                    filterName ? `${sort ? "&" : "?"}search=${filterName}` : ""
                }${sort || filterName ? "&" : "?"}page=${currentPage}`,
            providesTags: (result = []) => [
                ...result.results.map(({ id }) => ({ type: "Markets", id })),
                { type: "Markets", id: "LIST" },
            ],
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
                ...result.results.map(({ id }) => ({ type: "Products", id })),
                { type: "Products", id: "LIST" },
            ],
        }),
        getMarketsMe: build.query({
            query: ({ sort, filterName, currentPage }) =>
                `markets/me/?page=${currentPage}${
                    sort ? `${filterName ? "&" : "?"}tags=${sort}` : ""
                }${
                    filterName ? `${sort ? "&" : "?"}search=${filterName}` : ""
                }&limit=${20}`,
            providesTags: (result = []) => [
                ...result.results.map(({ id }) => ({ type: "Markets", id })),
                { type: "Markets", id: "LIST" },
            ],
        }),
        CreateMarketsMe: build.mutation({
            query(body) {
                return {
                    url: `markets/me/`,
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: [{ type: "Markets" }],
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
                    method: "PATCH",
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
            invalidatesTags: [{ type: "Markets" }],
        }),
        DeleteItemsMe: build.mutation({
            query({ id, market_id }) {
                return {
                    url: `markets/me/${market_id}/items/${id}/`,
                    method: "DELETE",
                };
            },
            invalidatesTags: [{ type: "Products" }],
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
    useDeleteItemsMeMutation,
} = products;
