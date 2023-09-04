import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_DEV_URL, _ns_token_ } from "../../config/constants";
import { getFromLocal } from "../../helpers/handleLocalStorage";

const BASE_URL = BASE_DEV_URL;

export const baseAPI = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers) => {
			const localToken = getFromLocal(_ns_token_);

			if (localToken) {
				headers.set("authorization", `Bearer ${localToken}`);
			}
			return headers;
		},
	}),
	tagTypes: [
		"Auth",
		"GetClasses",
		"GetStreams",
		"GetSingleStudent",
		"GetFees",
		"GetStudents",
		"GetSchools",
		"GetStudentFees",
		"GetAcademicYears",
		"GetChildren",
		"GetProfile",
		"GetStudentPaymentHistory",
		"GetEmployees",
		"GetDeductibles",
		"GetPositions",
		"GetSingleEmployee",
		"GetDeductibleTypes",
		"getInstallments",
		"GetParents",
		"GetAllAdminsPayments",
		"getMessages",
		"GetOnePayment"
	],
	endpoints: () => ({}),
});
