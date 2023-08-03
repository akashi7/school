import { baseAPI } from '../api'

const classroomsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query({
      providesTags: ['GetClasses'],
      query: ({ page, size, search, schoolId }) => ({
        url: `classrooms?page=${page || ''}&size=${size || 40}&schoolId=${
          schoolId || ''
        }&search=${search || ''}`,
        method: 'GET',
      }),
    }),

    addClass: builder.mutation({
      invalidatesTags: ['GetClasses'],
      query: (DTO) => ({
        url: 'classrooms',
        method: 'POST',
        body: DTO,
      }),
    }),

    editClass: builder.mutation({
      invalidatesTags: ['GetClasses', 'GetStudents'],
      query: (DTO) => ({
        url: `classrooms/${DTO?.id}`,
        method: 'PATCH',
        body: DTO,
      }),
    }),

    deleteClass: builder.mutation({
      invalidatesTags: ['GetClasses', 'GetStudents'],
      query: (DTO) => ({
        url: `classrooms/${DTO?.id}`,
        method: 'DELETE',
        body: DTO,
      }),
    }),

    getStreams: builder.query({
      providesTags: ['GetStreams'],
      query: (DTO) => ({
        url: `classrooms/${DTO.id}/streams?size=${DTO?.size || 100}`,
        method: 'GET',
      }),
    }),

    addStream: builder.mutation({
      invalidatesTags: ['GetStreams'],
      query: (DTO) => ({
        url: `classrooms/${DTO.id}/streams`,
        method: 'POST',
        body: DTO,
      }),
    }),

    deleteStream: builder.mutation({
      invalidatesTags: ['GetStreams'],
      query: (DTO) => ({
        url: `classrooms/${DTO?.id}/streams/${DTO.streamId}`,
        method: 'DELETE',
        body: DTO,
      }),
    }),

    editStream: builder.mutation({
      invalidatesTags: ['GetStreams'],
      query: (DTO) => ({
        url: `classrooms/${DTO?.id}/streams/${DTO.streamId}`,
        method: 'PATCH',
        body: DTO,
      }),
    }),
    downloadStream: builder.mutation({
      query: ({ academicYearId, id }) => ({
        url: `classrooms/download/files?academicYearId=${
          academicYearId || ''
        }&id=${id || ''}`,
        method: 'GET',
        headers: {
          'content-type': 'application/octet-stream',
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
    classList: builder.query({
      providesTags: ['GetStreams'],
      query: ({ academicYearId, id }) => ({
        url: `classrooms/class/pdf?academicYearId=${
          academicYearId || ''
        }&id=${id || ''}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetClassesQuery,
  useAddClassMutation,
  useEditClassMutation,
  useDeleteClassMutation,
  useLazyGetStreamsQuery,
  useAddStreamMutation,
  useDeleteStreamMutation,
  useEditStreamMutation,
  useGetStreamsQuery,
	useDownloadStreamMutation,
  useClassListQuery
} = classroomsEndpoints
