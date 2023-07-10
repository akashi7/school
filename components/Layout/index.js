import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Sider from "./Sider";
import Content from "./Content";
import { useWindowSize } from "../../helpers/useWindowSize";

const Layout = ({ children }) => {
	const { width } = useWindowSize();
	const isScreenSmall = width <= 1024;

	return (
		<div className="flex bg-white">
			<Sider />
			
			<div className="flex-1">
				<Navbar />
				<Content isScreenSmall={isScreenSmall}>{children}</Content>
			</div>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.element,
};

export default Layout;
