import { baseAPI } from '../api'

const InstallmentEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInstallments: builder.query({
			providesTags: ["getInstallments"],
			query: ({
				page,
				size,
        search,
        studentId
			}) => ({
				url: `installments?page=${page || ""}&size=${size || 40}&search=${search || ""}&studentId=${studentId||''}`,
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
    responseInstallment: builder.mutation({
      invalidatesTags: ['getInstallments'],
      query: (DTO) => ({
        url: 'installments',
        method: 'PATCH',
        body: DTO,
      }),
    }),
  }),
})

export const {
  useGetInstallmentsQuery,
  useLazyGetInstallmentsQuery,
  useAddInstallmentMutation,
  useResponseInstallmentMutation
} = InstallmentEndpoints
