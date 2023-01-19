import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Sider from "./Sider";
import Content from "./Content";

const Layout = ({ children }) => {
	return (
		<div className="flex bg-white">
			<Sider />

			<div className="flex-1">
				<Navbar />
				<Content>{children}</Content>
			</div>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.element,
};

export default Layout;
