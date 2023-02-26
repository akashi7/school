import React from "react";
import Private from "../../../components/Routes/Private";
import Children from "./children";

const Index = () => {
	return <Children />;
};

export default Private(Index);
