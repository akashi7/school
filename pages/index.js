import Image from 'next/image'
import React from 'react'
import Public from '../components/Routes/Public'
import Footer from '../components/Shared/Footer'
import IndexNavBar from '../components/Shared/NavBar'
import TabCmp from '../components/Shared/Tabs'
import WHITE_DECORATION from '../resources/decorations/white-decoration.svg'
import img_1 from '../resources/images/nestpay.png'

const IndexPage = () => {
  return (
    <div className='landingPage h-[100vh] overflow-auto'>
      <IndexNavBar />
      <div className='hero-container '>
        <div className='hero-section container-small '>
          <h1 className='title-xl font-bold italic'>
            SchoolFees payments made easier!
          </h1>
          <div className='flexs w-full items-center'>
            <div className='left'>
              <div className='landingPage__imageContiner lg:mb-10 mb-0  '>
                <Image src={img_1} alt='nestpay' className='' />
              </div>
            </div>
            <div className='lg:pl-[600px] w-full pl-0 '>
              <div className='w-full border-l-indigo-600'>
                <p className='w-full'>
                  Pay school fees wherever you’re using one of the many
                  available payment channels on SchoolNest Pay
                </p>
                <div className='btn-dashed  mb-10 mt-10 lg:w-fit '>
                  <div className='getStarted'>Get started</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='decoration  w-[90%] '>
          <Image src={WHITE_DECORATION} alt='school nestpay' />
        </div>
        <div className='stats'>
          <div className='stat'>
            <h2>$0K</h2>
            <p>Transactions</p>
          </div>
          <div className='stat'>
            <h2>3,581</h2>
            <p>Active Students</p>
          </div>
          <div className='stat'>
            <h2>14</h2>
            <p>Active Schools</p>
          </div>
        </div>
      </div>
      <div className='why'>
        <p className='title-xl mb-[100px] mt-10'>Why SchoolNest Pay?</p>
        <div className='container-small p-4'>
          <TabCmp />
        </div>
      </div>
      <Footer />
      <div></div>
    </div>
  )
}

export default Public(IndexPage)
