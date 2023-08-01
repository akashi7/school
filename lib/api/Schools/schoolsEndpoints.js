import { baseAPI } from "../api";

const schoolsEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getSchools: builder.query({
			providesTags: ["GetSchools"],
			query: () => ({
				url: "schools",
				method: "GET",
			}),
		}),

		addSchool: builder.mutation({
			invalidatesTags: ["GetSchools"],
			query: (DTO) => ({
				url: "schools/schools",
				method: "POST",
				body: DTO,
			}),
		}),

		deleteSchool: builder.mutation({
			invalidatesTags: ["GetSchools"],
			query: (DTO) => ({
				url: `schools/${DTO.id}`,
				method: "DELETE",
			}),
		}),

		editSchool: builder.mutation({
			invalidatesTags: ["GetSchools"],
			query: (DTO) => ({
				url: `schools/${DTO.id}/profile`,
				method: "PATCH",
				body: DTO,
			}),
		}),

		getSchoolProfile: builder.query({
			providesTags: ["GetProfile"],
			query: () => ({
				url: "schools/profile",
				method: "GET",
			}),
		}),
		getOneSchool: builder.query({
			providesTags: ["GetProfile"],
			query: ({id}) => ({
				url: `schools/${id}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetSchoolsQuery,
	useAddSchoolMutation,
	useDeleteSchoolMutation,
	useEditSchoolMutation,
	useGetSchoolProfileQuery,
	useGetOneSchoolQuery,
	useLazyGetOneSchoolQuery
} = schoolsEndpoints;
