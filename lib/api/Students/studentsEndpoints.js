import { baseAPI } from "../api";

const studentsEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getStudents: builder.query({
			providesTags: ["GetClasses"],
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
	}),
});

export const { useGetStudentsQuery, useLazyGetSingleStudentQuery } =
	studentsEndpoints;
