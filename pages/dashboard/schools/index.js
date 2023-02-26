import React from "react";
import Private from "../../../components/Routes/Private";
import Schools from "./schools";

const Index = () => {
	return <Schools />;
};

export default Private(Index);
