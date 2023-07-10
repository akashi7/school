import Image from 'next/image'
import React from 'react'
import Public from '../components/Routes/Public'
import Footer from '../components/Shared/Footer'
import IndexNavBar from '../components/Shared/NavBar'
import TabCmp from '../components/Shared/Tabs'
import WHITE_DECORATION from '../resources/decorations/white-decoration.svg'
import img_1 from '../resources/images/card.jpeg'

const IndexPage = () => {
  return (
    <div className='landingPage h-[100vh] overflow-auto'>
      <IndexNavBar />
      <div className='hero-container'>
        <div className='hero-section container-small'>
          <h1 className='title-xl'>SchoolFees payments made easier!</h1>
          <div className='flex'>
            <div className='left'>
              <div className='landingPage__imageContiner'>
                <Image src={img_1} alt='nestpay' />
              </div>
            </div>
            <div className='right'>
              <p className='desc'>
                Pay school fees wherever you’re using one of the many available
                payment channels on SchoolNest Pay
              </p>
              <div className='btn-dashed'>
                <div className='getStarted'>Get started</div>
              </div>
            </div>
          </div>
        </div>
        <div className='decoration'>
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
        <p className='title-xl'>Why SchoolNest Pay?</p>
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
