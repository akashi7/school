import { baseAPI } from "../api";

const feesEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getFees: builder.query({
			providesTags: ["GetFees"],
			query: ({ page, size, search, type, classroomId, term }) => ({
				url: `fees?page=${page || ""}&size=${size || 40}${
					type ? `&type=${type}` : ""
				}&search=${search || ""}&classroomId=${classroomId || ""}&term=${
					term || ""
				}`,
				method: "GET",
			}),
		}),

		addFee: builder.mutation({
			invalidatesTags: ["GetFees"],
			query: (DTO) => ({
				url: "fees",
				method: "POST",
				body: DTO,
			}),
		}),

		editFee: builder.mutation({
			invalidatesTags: ["GetFees"],
			query: (DTO) => ({
				url: `fee/${DTO?.id}`,
				method: "PATCH",
				body: DTO,
			}),
		}),

		deleteFee: builder.mutation({
			invalidatesTags: ["GetFees"],
			query: (DTO) => ({
				url: `fees/${DTO?.id}`,
				method: "DELETE",
				body: DTO,
			}),
		}),
	}),
});

export const {
	useGetFeesQuery,
	useAddFeeMutation,
	useEditFeeMutation,
	useDeleteFeeMutation,
} = feesEndpoints;
