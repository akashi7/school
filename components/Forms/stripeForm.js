import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import CustomButton from '../Shared/CustomButton'
const StripeForm = ({ setHasPayed,setIsPayMethodModalVisible }) => {
  const element = useElements()
  const stripe = useStripe()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !element) {
      return
    }

    const response = await stripe.confirmPayment({
      elements: element,
      confirmParams: {},
      redirect: 'if_required',
    })

    if (response.error) {
      console.log({ error: response.error })
    } else {
      setIsPayMethodModalVisible(false)
      setHasPayed(true)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement
          className='rounded  border p-5 '
          options={{ hidePostalCode: true }}
        />
        <div className='flex justify-end mt-8 mb-8'>
          <div className=' '>
            <CustomButton type='primary' htmlType='submit'>
              pay
            </CustomButton>
          </div>
        </div>
      </form>
    </>
  )
}

export default StripeForm
