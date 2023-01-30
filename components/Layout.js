import Footer from './Footer';
import NavBar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <div className='container'>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
