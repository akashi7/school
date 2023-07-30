import { baseAPI } from "../api";

const PaymentsEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getAllAdminsPayments: builder.query({
			providesTags: ["GetAllAdminsPayments"],
			query: ({
				page,
				size,
				academicYearId,
        academicTerm,
        studentIdentifier
			}) => ({
				url: `payments?page=${page || ""}&limit=${size || ""}&academicYearId=${academicYearId || ""}&academicTerm=${academicTerm || ""}&studentIdentifier=${studentIdentifier || ""}`,
				method: "GET",
			}),
		})
	}),
});


export const {
  useGetAllAdminsPaymentsQuery
} = PaymentsEndpoints;