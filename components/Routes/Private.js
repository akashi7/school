/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { _ns_token_ } from "../../config/constants";
import { useWindowSize } from "../../helpers/useWindowSize";
import SmallScreen from "../Shared/SmallScreen";

const Private = (Wrapped) => {
	return (props) => {
		const router = useRouter();
		const localToken = localStorage.getItem(_ns_token_);

		if (!localToken) {
			router.replace("/");
			return null;
		}

		const { width } = useWindowSize();

		return width <= 1025 ? <SmallScreen /> : <Wrapped {...props} />;
	};
};

export default Private;
