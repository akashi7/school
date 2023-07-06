import { baseAPI } from "../api";

const DeductiblesEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getDeductibles: builder.query({
			providesTags: ["GetDeductibles"],
			query: ({
				page,
				size,
				search,
				enumaration,
				type,
			}) => ({
				url: `deductibles?page=${page || ""}&limit=${size || ""}&enumaration=${
					enumaration || ""
				}&search=${search || ""}`,
				method: "GET",
			}),
		}),
    addDeductible: builder.mutation({
			invalidatesTags: ["GetDeductibles"],
			query: (DTO) => ({
				url: "deductibles",
				method: "POST",
				body: DTO,
			}),
		})
	}),
});


export const {
 useGetDeductiblesQuery,
 useLazyGetDeductiblesQuery,
 useAddDeductibleMutation
} = DeductiblesEndpoints;