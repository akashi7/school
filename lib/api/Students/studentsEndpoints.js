import { baseAPI } from "../api";

const studentsEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getStudents: builder.query({
			providesTags: ["GetStudents"],
			query: ({
				page,
				size,
				search,
				classroomId,
				academicYearId,
				streamId,
			}) => ({
				url: `students?page=${page || ""}&limit=${size || ""}&academicYearId=${
					academicYearId || ""
				}&classroomId=${classroomId || ""}&search=${search || ""}&streamId=${
					streamId || ""
				}`,
				method: "GET",
			}),
		}),

		getStudentFees: builder.query({
			providesTags: ["GetStudentFees"],
			query: ({ page, size, id, status, academicYearId, academicTerm }) => ({
				url: `students/${id}/fees?page=${page || ""}&size=${
					size || ""
				}&academicYearId=${academicYearId || ""}&status=${
					status || ""
				}&academicTerm=${academicTerm}`,
				method: "GET",
			}),
		}),

		addStudent: builder.mutation({
			invalidatesTags: ["GetStudents"],
			query: (DTO) => ({
				url: "students",
				method: "POST",
				body: DTO,
			}),
		}),

		getSingleStudent: builder.query({
			providesTags: ["GetSingleStudent"],
			query: ({ id }) => ({
				url: `students/${id}`,
				method: "GET",
			}),
		}),

		deleteStudent: builder.mutation({
			invalidatesTags: ["GetStudents"],
			query: (DTO) => ({
				url: `students/${DTO?.id}`,
				method: "DELETE",
				body: DTO,
			}),
		}),

		editStudent: builder.mutation({
			invalidatesTags: ["GetSingleStudent"],
			query: (DTO) => ({
				url: `students/${DTO?.id}`,
				method: "PATCH",
				body: DTO,
			}),
		}),

		promoteStudent: builder.mutation({
			invalidatesTags: ["GetSingleStudent"],
			query: (DTO) => ({
				url: `students/${DTO?.id}/promotions`,
				method: "POST",
				body: DTO,
			}),
		}),
	}),
});

export const {
	useGetStudentsQuery,
	useLazyGetSingleStudentQuery,
	useDeleteStudentMutation,
	useEditStudentMutation,
	useAddStudentMutation,
	usePromoteStudentMutation,
	useGetStudentFeesQuery,
} = studentsEndpoints;
