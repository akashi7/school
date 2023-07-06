import { baseAPI } from "../api";

const PositionsEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getPositions: builder.query({
			providesTags: ["GetPositions"],
			query: ({
				page,
				size,
				search,
			}) => ({
				url: `positions?page=${page || ""}&limit=${size || ""}&search=${search || ""}`,
				method: "GET",
			}),
		}),
    addPosition: builder.mutation({
			invalidatesTags: ["GetPositions"],
			query: (DTO) => ({
				url: "positions",
				method: "POST",
				body: DTO,
			}),
		})
	}),
});


export const {
useGetPositionsQuery,
useLazyGetPositionsQuery,
useAddPositionMutation
} = PositionsEndpoints;