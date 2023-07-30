import LoginWithGoogle from "../components/Auth/Google/login";
import Public from "../components/Routes/Public";

const GoogleLogin = () => {
	return <LoginWithGoogle />;
};

export default Public(GoogleLogin)