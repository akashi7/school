import { baseAPI } from '../api'

const InstallmentEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInstallments: builder.query({
			providesTags: ["getInstallments"],
			query: ({
				page,
				size,
        search
			}) => ({
				url: `installments?page=${page || ""}&size=${size || 40}&search=${search || ""}`,
				method: "GET",
			}),
		}),
    addInstallment: builder.mutation({
      invalidatesTags: ['getInstallments'],
      query: (DTO) => ({
        url: 'installments',
        method: 'POST',
        body: DTO,
      }),
    }),
  }),
})

export const {
  useGetInstallmentsQuery,
  useLazyGetInstallmentsQuery,
  useAddInstallmentMutation
} = InstallmentEndpoints
