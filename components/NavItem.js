const NavItem = ({ text, href, active, btn }) => {
  return (
    // <a href={href} className={btn ? "button" : "nav__link"}>
    <div className="nav__link">{text}</div>
  );
};

export default NavItem;
