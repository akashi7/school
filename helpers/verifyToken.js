import jwt from "jsonwebtoken";
import { _ns_token_ } from "../config/constants";
import { getFromLocal } from "./handleLocalStorage";

export const isTokenValid = (err) => {
	const token = getFromLocal(_ns_token_);
	const decoded = jwt.decode(token);

	if (err?.status === 401) {
		localStorage.removeItem(_ns_token_);
		window.location.href = "/";
	}

	return { role: decoded?.role, id: decoded?.id,country:decoded?.countryName };
};
