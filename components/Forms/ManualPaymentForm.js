import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import React from 'react'
import requiredField from '../../helpers/requiredField'
import { useGetAcademicYearsQuery } from '../../lib/api/AcademicYear/academicYearEndpoints'
import CustomInput from '../Shared/CustomInput'
import StripeForm from './stripeForm'

const ManualPaymentForm = ({
  form,
  onFinish,
  lang,
  payMethod,
  secretKey,
  setHasPayed,
  setIsPayMethodModalVisible
}) => {
  const { data: academicYears, isFetching: isAcademicYearsLoading } =
    useGetAcademicYearsQuery({
      page: 0,
      size: 100,
    })

  const academicYearsList = academicYears?.payload?.totalItems
    ? [
        ...academicYears?.payload?.items?.map((item) => ({
          key: item?.name,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  const stripePromise = loadStripe(
    'pk_test_51NGjbzAFzKkXrVlicogDMn2ztjPOdnxnmqwWT5gt8i5mq6Uxos9byTUxeXgtnrV3kausDflJzCNAsR2omXOz3hiH00iBQzo1gu'
  )
  return (
    <>
      {payMethod === 'STRIPE' && secretKey && (
        <Row align='middle' wrap={false} gutter={24}>
          <Col className='w-[100%]'>
            <Elements stripe={stripePromise} options={{clientSecret:secretKey}} >
              <StripeForm  setHasPayed={setHasPayed} setIsPayMethodModalVisible={setIsPayMethodModalVisible}  />
            </Elements>
          </Col>
        </Row>
      )}
      <Form form={form} name='manual-payment' onFinish={onFinish}>
        {payMethod === 'STRIPE' ? (
          !secretKey && (
            <>
              <Row className='pt-4' align='middle' wrap={false} gutter={24}>
                <Col className='w-[50%] '>
                  <CustomInput
                    label={lang?.students_pg?.modals?.phone_number}
                    placeholder={`${lang?.students_pg?.modals?.phone_number}...`}
                    name='phoneNumber'
                    rules={requiredField(
                      lang?.students_pg?.modals?.phone_number
                    )}
                    styles={'p-6'}
                  />
                </Col>
                <Col className='w-[50%]'>
                  <CustomInput
                    label={lang?.students_pg?.modals?.amount}
                    placeholder={`${lang?.students_pg?.modals?.amount}...`}
                    name='amount'
                    rules={requiredField(lang?.students_pg?.modals?.amount)}
                    styles={'p-6'}
                  />
                </Col>
              </Row>
              <Row align='middle' wrap={false} gutter={24}>
                <Col className='w-[100%]'>
                  <CustomInput
                    label={lang?.students_pg?.modals?.description}
                    placeholder={`${lang?.students_pg?.modals?.description}...`}
                    name='description'
                    rules={requiredField(
                      lang?.students_pg?.modals?.description
                    )}
                    styles={'p-6'}
                  />
                </Col>
              </Row>
            </>
          )
        ) : (
          <>
            <Row align='middle' wrap={false} gutter={24}>
              <Col className='w-[50%]'>
                <CustomInput
                  label={lang?.students_pg?.modals?.amount}
                  placeholder={`${lang?.students_pg?.modals?.amount}...`}
                  name='amount'
                  rules={requiredField(lang?.students_pg?.modals?.amount)}
                />
              </Col>
              <Col className='w-[50%]'>
                <CustomInput
                  label={lang?.students_pg?.modals?.phone_number}
                  placeholder={`${lang?.students_pg?.modals?.phone_number}...`}
                  name='phoneNumber'
                  rules={requiredField(lang?.students_pg?.modals?.phone_number)}
                />
              </Col>
              {/* 
        <Col className='w-[50%]'>
          <CustomInput
            label={lang?.students_pg?.modals?.date}
            placeholder={`${lang?.students_pg?.modals?.date}...`}
            name='date'
            type='date'
            rules={requiredField(lang?.students_pg?.modals?.date)}
          />
        </Col> */}
            </Row>

            <Row align='middle' wrap={false} gutter={24}>
              {/* <Col className='w-[50%]'>
          <CustomInput
            label={lang?.students_pg?.modals?.reference_code}
            placeholder={`${lang?.students_pg?.modals?.reference_code}...`}
            name='referenceCode'
            // rules={requiredField(lang?.students_pg?.modals?.reference_code)}
          />
        </Col> */}
            </Row>

            {/* <Row align='middle' wrap={false} gutter={24}>
        <Col className='w-[50%]'>
          <CustomInput
            type='select'
            name='academicYearId'
            label={lang?.students_pg?.modals?.academic_year}
            isLoading={isAcademicYearsLoading}
            rules={requiredField(lang?.students_pg?.modals?.academic_year)}
            options={academicYearsList}
          />
        </Col>

        <Col className='w-[50%]'>
          <CustomInput
            type='select'
            name='academicTerm'
            label={lang?.dashboard_shared?.filters?.term?.name}
            rules={requiredField(lang?.dashboard_shared?.filters?.term?.name)}
            options={[
              {
                key: 1,
                value: '',
                label: lang?.dashboard_shared?.filters?.term?.sub_title,
              },
              ...termOptions,
            ]}
          />
        </Col>
      </Row> */}

            {/* <Row align='middle' wrap={false} gutter={24}>
        <Col className='w-[50%]'>
          <CustomInput
            label={lang?.students_pg?.modals?.country_name}
            placeholder='Select country'
            type='select'
            name='country'
            showSearch={true}
            value={countryCode}
            onChange={handleCountryChange}
            options={countries_with_codes?.map((country) => ({
              ...country,
              index: country?.name,
              value: country?.name,
              key: country?.name,
            }))}
            rules={requiredField('Country')}
          />
        </Col>
				<Col className='w-[50%]'>
          <CustomInput
            label={lang?.students_pg?.modals?.currency}
            name='currency'
            rules={requiredField('Currency')}
          />
        </Col>
      </Row> */}

            <Row align='middle' wrap={false} gutter={24}>
              <Col className='w-[100%]'>
                <CustomInput
                  label={lang?.students_pg?.modals?.description}
                  placeholder={`${lang?.students_pg?.modals?.description}...`}
                  name='description'
                  rules={requiredField(lang?.students_pg?.modals?.description)}
                />
              </Col>
            </Row>
          </>
        )}
      </Form>
    </>
  )
}

export default ManualPaymentForm
