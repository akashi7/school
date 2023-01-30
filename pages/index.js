import Login from "../components/Auth/Login";
import Public from "../components/Routes/Public";

const IndexPage = () => {
	return <Login />;
};

export default Public(IndexPage);
