import React, { useState } from "react";
import NavItem from "./NavItem";
import Logo from "../resources/images/logo.png";
import { FiXCircle } from "react-/icons/fi";
import Image from "next/image";
import Link from "next/link";

const MENU_LIST_RIGHT = [
	{ text: "Home", href: "/", btn: false },
	{ text: "Payment code", href: "/", btn: false },
	{ text: "Contact us", href: "/", btn: false },
	{ text: "Login", href: "/", btn: false },
	{ text: "Pay Now", btn: true },
];
const Navbar = ({
	navbarStyles,
	onPaynowHandler,
	homeClickHandler,
	onPaymentCodeSearchHandler,
}) => {
	const [navActive, setNavActive] = useState(null);
	const [activeIdx, setActiveIdx] = useState(-1);

	return (
		<header className="navbar-cmp">
			<nav className="container-default">
				<a href={"/"}>
					<Image src={Logo} alt="school nest pay" />
				</a>
				<div
					onClick={() => setNavActive(!navActive)}
					className={`nav__menu-bar`}
				>
					<div></div>
					<div></div>
					<div></div>
				</div>
				{/* <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx ==== idx} {...menu} />
            </div>
          ))}
        </div> */}
				<div className={`${navActive ? "active" : ""} nav__menu-list`}>
					<div onClick={() => setNavActive(false)} className="nav__closeIcon">
						<FiXCircle color="#ef3c24" />
					</div>
					{MENU_LIST_RIGHT.map((menu, idx) => {
						if (idx === 0) {
							return (
								<div
									key={idx}
									className="nav__link"
									onClick={() => homeClickHandler()}
								>
									Home
								</div>
							);
						}
						if (idx === 1) {
							return (
								<div
									key={idx}
									className="nav__link"
									onClick={() => {
										onPaymentCodeSearchHandler();
										setNavActive(false);
									}}
								>
									Payment Code
								</div>
							);
						}
						if (idx === 3) {
							return (
								<Link key={idx} className="nav__link" href="/login">
									Login
								</Link>
							);
						}
						if (idx === 4) {
							return (
								<div
									key={idx}
									className="button"
									onClick={() => {
										onPaynowHandler();
										setNavActive(false);
									}}
								>
									Pay now
								</div>
							);
						}
						return (
							<div
								onClick={() => {
									setActiveIdx(idx);
									setNavActive(false);
								}}
								key={menu.text}
							>
								<NavItem index={idx} active={activeIdx === idx} {...menu} />
							</div>
						);
					})}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
