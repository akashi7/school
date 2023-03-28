import { baseAPI } from "../api";

const childrenEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getChildren: builder.query({
			providesTags: ["GetChildren"],
			query: () => ({
				url: "parents/children",
				method: "GET",
			}),
		}),
	}),
});

export const { useGetChildrenQuery } = childrenEndpoints;
