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
			invalidatesTags: ["GetStudents"],
			query: (DTO) => ({
				url: `students/${DTO?.id}`,
				method: "PATCH",
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
} = studentsEndpoints;
