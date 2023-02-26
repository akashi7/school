import React from "react";
import Private from "../../../components/Routes/Private";
import SingleStudent from "./SingleStudent";

const Index = () => {
	return <SingleStudent />;
};

export default Private(Index);
