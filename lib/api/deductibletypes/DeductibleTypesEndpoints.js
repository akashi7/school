import { baseAPI } from '../api'

const DeductibleTypesEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    GetDeductibleTypes: builder.query({
      providesTags: ['GetDeductibleTypes'],
      query: ({ page, size, search, type, enumaration }) => ({
        url: `deductible-types?page=${page || ''}&limit=${size || ''}&search=${
          search || ''
        }&type=${type || ''}&enumaration=${enumaration || ''}`,
        method: 'GET',
      }),
    }),
    addDeductibleType: builder.mutation({
      invalidatesTags: ['GetDeductibleTypes'],
      query: (DTO) => ({
        url: 'deductible-types',
        method: 'POST',
        body: DTO,
      }),
    }),
    downloadPayroll: builder.mutation({
      query: ({ id }) => ({
        url: `deductible-types/employees/download?id=${id || ''}`,
        method: 'GET',
        headers: {
          'content-type': 'application/octet-stream',
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
})

export const {
  useAddDeductibleTypeMutation,
  useGetDeductibleTypesQuery,
  useLazyGetDeductibleTypesQuery,
  useDownloadPayrollMutation,
} = DeductibleTypesEndpoints
