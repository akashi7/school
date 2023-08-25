import ForgotPasswords from "../components/Auth/ForgotPassword";
import Public from "../components/Routes/Public";

const ForgotPassword = () => {
	return <ForgotPasswords />;
};

export default Public(ForgotPassword)