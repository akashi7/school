import { configureStore } from "@reduxjs/toolkit";
import { baseAPI } from "../api/api";
import translationSlice from "./translationSlice";

export const store = configureStore({
	reducer: {
		[baseAPI.reducerPath]: baseAPI.reducer,
		translation: translationSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseAPI.middleware),
});
