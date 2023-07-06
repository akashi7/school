import React from "react";
import Private from "../../../components/Routes/Private";
import SingleEmployee from "./SingleEmployee";

const Index = () => {
	return <SingleEmployee />;
};

export default Private(Index);
