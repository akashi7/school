import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "translation",
	initialState: { payload: "" },
	reducers: {
		getTranslation: (state, { payload }) => {
			state.payload = payload;
		},
	},
});

export const { getTranslation } = slice.actions;
export default slice.reducer;
