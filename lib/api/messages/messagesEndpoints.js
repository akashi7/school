import { baseAPI } from '../api'

const MessagesEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
			providesTags: ["getMessages"],
			query: ({
				page,
				size,
			}) => ({
				url: `message?page=${page || ""}&size=${size || 10}`,
				method: "GET",
			}),
		}),
    addMessage: builder.mutation({
      invalidatesTags: ['getMessages'],
      query: (DTO) => ({
        url: 'message',
        method: 'POST',
        body: DTO,
      }),
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useAddMessageMutation
} = MessagesEndpoints
