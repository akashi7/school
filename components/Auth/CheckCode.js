import React from 'react'
import CheckCodeForm from '../Forms/CheckCodeForm'

const CheckCode = () => {
  return (
    <div
      className='w-[100%] h-[100vh] px-4  bg-cover flex items-center justify-center'
      style={{
        background:
          'linear-gradient(0deg, rgba(30 30 50 / 54%), rgba(30 30 50 / 54%)), url(/imgs/bg-img-compressed.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <CheckCodeForm />
    </div>
  )
}

export default CheckCode
