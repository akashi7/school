import React from "react";
import Logo from "../resources/images/logo.png";

const Footer = () => {
  return (
    <div className="footerCmp">
      <div className="container-default">
        <div className="footerCmp__container container-small">
          <div className="footerCmp__imgContainer">
            <img src={Logo} alt="nextpay" />
          </div>
          <div className="footerCmp__copyRight">
            Copyright &copy;
            <b>
              <a href="https://github.com/mansurissa">SchoolNest Pay</a>
            </b>
            2022
          </div>
          <div className="footerCmp__linksContainer">
            <a className="footerCmp__links" href="/">
              Login
            </a>
            <div className="footerCmp__links">Pay Now</div>
            <div className="footerCmp__links">Payment code</div>
          </div>
          {/* <p>All in one paymant solution for personal and business.</p> */}
          {/* <div className='grid'>
            <h2>Sitemap</h2>
            <div className='footer-links'>
              <div className='footer-link'>
                <div>
                  <Link href='/'>About us</Link>
                </div>
                <div>
                  <Link href='/'>About us</Link>
                </div>
                <div>
                  <Link href='/'>About us</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='grid'>
            <h2>Sitemap</h2>
            <div className='footer-links'>
              <div className='footer-link'>
                <div>
                  <Link href='/'>About us</Link>
                </div>
                <div>
                  <Link href='/'>About us</Link>
                </div>
                <div>
                  <Link href='/'>About us</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='grid'>
            <h2>Sitemap</h2>
            <div className='footer-links'>
              <div className='footer-link'>
                <div>
                  <Link href='/'>About us</Link>
                </div>
                <div>
                  <Link href='/'>About us</Link>
                </div>
                <div>
                  <Link href='/'>About us</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='grid'>
            <h2>Sitemap</h2>
            <div className='footer-links'>
              <div className='footer-link'>
                <div>
                  <Link href='/'>About us</Link>
                </div>
                <div>
                  <Link href='/'>About us</Link>
                </div>
                <div>
                  <Link href='/'>About us</Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
