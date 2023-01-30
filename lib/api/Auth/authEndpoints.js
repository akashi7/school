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
	}),
});

export const { useLoginMutation } = authApi;
