import React from "react";
import Logo from "../../resources/images/logo.png";
import Image from "next/image";
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footerCmp">
      <div className="container-default">
        <div className="footerCmp__container container-small">
          <div className="footerCmp__imgContainer">
            <Image src={Logo} alt="school nest pay" />
          </div>
          <div className="footerCmp__copyRight">
            Copyright &copy;
            <b>
              <Link href="https://github.com/mansurissa">SchoolNest Pay</Link>
            </b>
            2022
          </div>
          {/* <div className="footerCmp__linksContainer">
            <Link className="footerCmp__links" href="/LoginPage">
              Login
            </Link>
          </div> */}
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
