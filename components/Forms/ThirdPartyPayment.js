import CustomImage from '../Shared/CustomImage'

const ThirdPartyPayment = ({
  setPaymentMethod,
  setIsPayModalVisible,
  setIsPayMethodModalVisible,
  country,
}) => {
  function OnClick(method) {
    setPaymentMethod(method)
    setIsPayModalVisible(false)
    setIsPayMethodModalVisible(true)
  }

  console.log({country})

  return (
    <div className={`mx-auto w-[90%]`}>
      <div className='flex justify-between items-center'>
        <div className={`flex flex-col items-center`}>
          <p className=' text-lg font-bold'>Mtn</p>
          <CustomImage
            src={'/imgs/mtn.png'}
            width={200}
            height={190}
            onClick={() => OnClick('MTN')}
            className={'p-4 cursor-pointer'}
          />
        </div>
        <div className='flex flex-col items-center  m-4'>
          <p className=' text-lg font-bold'>Spenn</p>
          <CustomImage
            src={'/imgs/spenn.png'}
            width={190}
            height={180}
            onClick={() => OnClick('SPENN')}
            className={'p-4 cursor-pointer'}
          />
        </div>
      </div>
      <div className={`flex justify-between items-center`}>
        {country !=='Rwanda'&& <div
          className={`flex flex-col items-center  m-4 ${
            country === 'Rwanda'? 'hidden' : 'block'
          } `}
        >
          <p className=' text-lg font-bold'>Mpessa</p>
          <CustomImage
            src={'/imgs/mpessa.png'}
            width={200}
            height={150}
            onClick={() => OnClick('MPESSA')}
            className={'p-4 object-cover cursor-pointer'}
          />
        </div>}
        
        <div className='flex flex-col items-center  m-4'>
          <p className=' text-lg font-bold'>Stripe</p>
          <CustomImage
            src={'/imgs/stripe.png'}
            width={200}
            height={150}
            onClick={() => OnClick('STRIPE')}
            className={'p-4 cursor-pointer'}
          />
        </div>
      </div>
    </div>
  )
}

export default ThirdPartyPayment
