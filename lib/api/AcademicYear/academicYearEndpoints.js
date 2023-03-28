import { baseAPI } from "../api";

const academicYearEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getAcademicYears: builder.query({
			providesTags: ["GetAcademicYears"],
			query: ({ page, size }) => ({
				url: `academic-years?page=${page || ""}&size=${size || 100}`,
				method: "GET",
			}),
		}),

		addAcademicYear: builder.mutation({
			invalidatesTags: ["GetAcademicYears"],
			query: (DTO) => ({
				url: "academic-years",
				method: "POST",
				body: DTO,
			}),
		}),

		deleteAcademicYear: builder.mutation({
			invalidatesTags: ["GetAcademicYears"],
			query: (DTO) => ({
				url: `academic-years/${DTO.id}`,
				method: "DELETE",
			}),
		}),

		editAcademicYear: builder.mutation({
			invalidatesTags: ["GetAcademicYears"],
			query: (DTO) => ({
				url: `academic-years/${DTO.id}`,
				method: "PATCH",
				body: DTO,
			}),
		}),

		setCurrentYear: builder.mutation({
			invalidatesTags: ["GetAcademicYears"],
			query: (DTO) => ({
				url: `academic-years/${DTO.id}/set-current`,
				method: "PATCH",
				body: DTO,
			}),
		}),
	}),
});

export const {
	useGetAcademicYearsQuery,
	useAddAcademicYearMutation,
	useDeleteAcademicYearMutation,
	useEditAcademicYearMutation,
	useSetCurrentYearMutation,
} = academicYearEndpoints;
