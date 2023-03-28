/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { _ns_token_ } from "../../config/constants";

const Private = (Wrapped) => {
	return (props) => {
		const router = useRouter();
		const localToken = localStorage.getItem(_ns_token_);

		if (!localToken) {
			router.replace("/");
			return null;
		}

		return <Wrapped {...props} />;
	};
};

export default Private;
