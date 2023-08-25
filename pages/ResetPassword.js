import ResetPassword from "../components/Auth/ResetPassword";
import Public from "../components/Routes/Public";

const ResetPasswordPage = () => {
	return <ResetPassword />;
};

export default Public(ResetPasswordPage)