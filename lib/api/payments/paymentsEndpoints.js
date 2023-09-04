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
    getOnePaymentDetails: builder.query({
      providesTags: ['GetOnePayment'],
      query: ({ id, academicYearId, academicTerm, from, to }) => ({
        url: `payments/downloadExcel/${id}?academicYearId=${
          academicYearId || ''
        }&academicTerm=${academicTerm || ''}&from=${from || ''}&to=${to || ''}`,
        method: 'GET',
      }),
    }),
    downloadPaymentDetails: builder.mutation({
      query: ({ id, academicYearId, academicTerm, from, to }) => ({
        url: `payments/downloadExcel/${id}?academicYearId=${
          academicYearId || ''
        }&academicTerm=${academicTerm || ''}&from=${from || ''}&to=${to || ''}`,
        method: 'GET',
        headers: {
          'content-type': 'application/octet-stream',
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
})

export const { useGetAllAdminsPaymentsQuery, useGetOnePaymentDetailsQuery,useDownloadPaymentDetailsMutation } =
  PaymentsEndpoints
