import { baseAPI } from '../api'

const PaymentsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdminsPayments: builder.query({
      providesTags: ['GetAllAdminsPayments'],
      query: ({
        page,
        size,
        academicYearId,
        academicTerm,
        studentIdentifier,
        from,
        to,
      }) => ({
        url: `payments?page=${page || ''}&limit=${size || ''}&academicYearId=${
          academicYearId || ''
        }&academicTerm=${academicTerm || ''}&studentIdentifier=${
          studentIdentifier || ''
        }&from=${from || ''}&to=${to || ''}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllAdminsPaymentsQuery } = PaymentsEndpoints
