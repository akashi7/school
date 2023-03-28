import { baseAPI } from "../api";

const feesEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getFees: builder.query({
			providesTags: ["GetFees"],
			query: ({
				page,
				size,
				search,
				type,
				classroomId,
				term,
				academicYearId,
			}) => ({
				url: `fees?page=${page || ""}&size=${size || 40}${
					type ? `&type=${type}` : ""
				}&search=${search || ""}&classroomId=${classroomId || ""}&term=${
					term || ""
				}&academicYearId=${academicYearId || ""}`,
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
				url: `fees/${DTO?.id}`,
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

		downloadFees: builder.mutation({
			query: ({ search, type, classroomId, term, academicYearId, url }) => ({
				url: `fees/${url || "classrooms"}/download?search=${search || ""}${
					type ? `&type=${type}` : ""
				}&classroomId=${classroomId || ""}&term=${term || ""}&academicYearId=${
					academicYearId || ""
				}`,
				method: "GET",
				headers: {
					"content-type": "application/octet-stream",
				},
				responseHandler: (response) => response.blob(),
			}),
		}),
	}),
});

export const {
	useGetFeesQuery,
	useAddFeeMutation,
	useEditFeeMutation,
	useDeleteFeeMutation,
	useDownloadFeesMutation
} = feesEndpoints;
