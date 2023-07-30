import { baseAPI } from '../api'

const childrenEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getChildren: builder.query({
      providesTags: ['GetChildren'],
      query: () => ({
        url: 'parents/children',
        method: 'GET',
      }),
    }),
    assignChildren: builder.mutation({
      providesTags: [''],
      query: ({id}) => ({
        url: `relative/${id}`,
        method: 'POST',
      }),
    }),
    GetParents: builder.query({
      providesTags: ['GetParents'],
      query: () => ({
        url: 'parents',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetChildrenQuery, useGetParentsQuery,useAssignChildrenMutation } = childrenEndpoints
