import { baseAPI } from "../api";

const employeesEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getEmployees: builder.query({
			providesTags: ["GetEmployees"],
			query: ({
				page,
				size,
				search,
				emunaration,
				current,
				position
			}) => ({
				url: `employees?page=${page || ""}&limit=${size || ""}&emunaration=${
					emunaration || ""
				}&current=${current || ""}&search=${search || ""}&position=${position || ""}`,
				method: "GET",
			}),
		}),
    addEmployee: builder.mutation({
			invalidatesTags: ["GetEmployees"],
			query: (DTO) => ({
				url: "employees",
				method: "POST",
				body: DTO,
			}),
		}),
		getSingleEmployee: builder.query({
			providesTags: ["GetSingleEmployee"],
			query: ({ id }) => ({
				url: `employees/${id}`,
				method: "GET",
			}),
		}),
    editEmployee: builder.mutation({
			invalidatesTags: ["GetSingleEmployee", "GetEmployees"],
			query: (DTO) => ({
				url: `employees/${DTO?.id}`,
				method: "PATCH",
				body: DTO,
			}),
		}),
	}),
});


export const {
	useGetEmployeesQuery,
  useLazyGetEmployeesQuery,
  useAddEmployeeMutation,
	useLazyGetSingleEmployeeQuery,
	useEditEmployeeMutation
} = employeesEndpoints;