import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FiXCircle } from 'react-icons/fi'
import Logo from '../../resources/images/logo.png'

const IndexNavBar = () => {
  const [navActive, setNavActive] = useState(null)
  const [activeIdx, setActiveIdx] = useState(-1)

  return (
    <header className='navbar-cmp'>
      <nav className='container-default p-5'>
        <a href={'/'}>
          <Image src={Logo} alt='school nest pay' />
        </a>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? 'active' : ''} nav__menu-list`}>
          <div onClick={() => setNavActive(false)} className='nav__closeIcon'>
            <FiXCircle color='#ef3c24' />
          </div>
          <Link href='/LoginPage' className='nav__link'>
            Login
          </Link>
          <Link href='/signup' className='nav__link'>
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default IndexNavBar
