import { baseAPI } from "../api";

const academicYearEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getAcademicYears: builder.query({
			providesTags: ["GetClasses"],
			query: ({ page, size }) => ({
				url: `academic-years?page=${page || ""}&size=${size || 100}`,
				method: "GET",
			}),
		}),
	}),
});

export const { useGetAcademicYearsQuery } = academicYearEndpoints;
