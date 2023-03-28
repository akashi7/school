import { baseAPI } from "../api";

const authApi = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (DTO) => ({
				url: `/auth/login/${DTO.url || "school"}`,
				method: "POST",
				body: DTO,
			}),
		}),

		userProfile: builder.query({
			query: () => ({
				url: "/auth/profile",
				method: "GET",
			}),
		}),
	}),
});

export const { useLoginMutation, useUserProfileQuery } = authApi;
