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
        <div className='lg:flex items-center opz flex-row' >
          <div>Home</div>
          <div className='pl-5'>How it works</div>
          <div className='pl-5'>Features</div>
        </div>
        <div
          onClick={() => setNavActive(!navActive)}
          className={` lg:flex lg:justify-between lg:items-center hidden nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? 'active' : ''} nav__menu-list`}>
          <div onClick={() => setNavActive(false)} className='nav__closeIcon'>
            <FiXCircle color='#ef3c24' />
          </div>
          <Link href='/LoginPage' className='lg:text-left text-center'>
            Login
          </Link>
          <Link
            href='/signup'
            className=' bg-rose-500 text-white p-3 rounded-3xl lg:text-left text-center'
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default IndexNavBar
