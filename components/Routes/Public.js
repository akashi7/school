/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useRouter } from "next/router";
import routes from "../../config/routes";

const Public = (Wrapped) => {
	return (props) => {
		const router = useRouter();
		const localToken = localStorage.getItem("_nest_school_logged_in_");

		if (localToken) {
			router.replace(routes.dashboard.url);
			return null;
		}

		return <Wrapped {...props} />;
	};
};

export default Public;
