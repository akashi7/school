import { baseAPI } from "../api";

const authApi = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (DTO) => ({
				url: "/auth/login/school",
				method: "POST",
				body: DTO,
			}),
		}),

		userProfile: builder.query({
			query: () => ({
				url: "/classrooms",
				method: "GET",
			}),
		}),
	}),
});

export const { useLoginMutation, useUserProfileQuery } = authApi;
