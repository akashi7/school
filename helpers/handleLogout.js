import { _ns_token_ } from "../config/constants";

export const logout = () => {
	localStorage.removeItem(_ns_token_);
	window.location.href = "/";
};
