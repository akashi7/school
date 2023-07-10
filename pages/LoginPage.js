import Login from "../components/Auth/Login";
import Public from "../components/Routes/Public";

const LoginPage = () => {
	return <Login />;
};

export default Public(LoginPage)