import { api } from "./api";

export const tags = api.injectEndpoints({
    endpoints: (build) => ({
        getTagsList: build.query({
            query: () => `markets/tags/`,
        }),
    }),
});

export const { useGetTagsListQuery } = tags;
