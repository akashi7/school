import React from "react";
import Private from "../../../components/Routes/Private";
import PayNow from "./pay-now";
import Layout from "../../../components/Layout/index";


const Index = () => {
	return <Layout>
    <PayNow />
  </Layout>;
};

export default Private(Index);
