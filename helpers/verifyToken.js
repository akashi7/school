import jwt from "jsonwebtoken";
import { _ns_token_ } from "../config/constants";
import { getFromLocal } from "./handleLocalStorage";

export const isTokenValid = () => {
	const token = getFromLocal(_ns_token_);
	const decoded = jwt.decode(token);

	return null;
};
