import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import EmployeeProfile from '../../../components/EmployeeProfile'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import { Empty } from '../../../components/Shared/Empty'
import { AppLoader } from '../../../components/Shared/Loaders'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import { useWindowSize } from '../../../helpers/useWindowSize'
import { isTokenValid } from '../../../helpers/verifyToken'
import { useLazyGetSingleEmployeeQuery } from '../../../lib/api/Employees/employeesEndpoints'

const SingleEmployee = () => {
  const { id, role, country } = isTokenValid('')

  const lang = useSelector((state) => state?.translation?.payload)

  const [getSingleEmployee, { data, isLoading, isFetching }] =
    useLazyGetSingleEmployeeQuery()

  useEffect(() => {
    handleAPIRequests({
      request: getSingleEmployee,
      id,
    })
  }, [getSingleEmployee, id])

  useEffect(() => {
    if (data) {
      let es = data?.payload?.employeeSalary?.map((arr) => arr?.name)
      localStorage.setItem('enu',(es?.toString()))
    }
  }, [data])

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const TableNavLeftSide = () => (
    <Row align='middle' gutter={20}>
      <Col>
        <p className='text-[20px] text-dark font-semibold'>
          {/* {lang?.students_pg?.profile?.table?.title} */} Employee Info
        </p>
      </Col>
    </Row>
  )


  return (
    <>
      {isLoading ? (
        <AppLoader />
      ) : !data ? (
        <Empty message='The item you are looking for is not available!' />
      ) : (
        <>
          <EmployeeProfile
            data={data}
            isFetching={isFetching}
            setIsVisible={() => null}
            setIsWarningVisible={() => null}
            setIsPromoteModalVisible={() => null}
            lang={lang}
            isScreenSmall={isScreenSmall}
            showAmount={false}
          />

          <ContentTableContainer>
            <ContentNavbar
              left={<TableNavLeftSide />}
              // right={<TableNavRightSide />}
            />

            <div
              style={{ maxHeight: isScreenSmall ? '' : 'calc(100vh - 440px)' }}
              className={`mt-5 ${
                !isScreenSmall && 'h-[fit-content] overflow-x-auto'
              }`}
            >
              <div className='w-[50%] '>
                <div className='flex justify-between mt-5'>
                  <p className='text-dark'>Address</p>
                  <p className='text-gray-400 '>{data?.payload?.address}</p>
                </div>
                <div className='flex justify-between mt-5'>
                  <p className='text-dark'>Dob</p>
                  <p className='text-gray-400 '>
                    {moment(data?.payload?.employeeDob).format('YYYY-MM-DD')}
                  </p>
                </div>
                <div className='flex justify-between mt-5'>
                  <p className='text-dark'>Email</p>
                  <p className='text-gray-400 '>
                    {data?.payload?.employeeEmail}
                  </p>
                </div>
                <div className='flex justify-between mt-5'>
                  <p className='text-dark'>Gender</p>
                  <p className='text-gray-400 '>
                    {data?.payload?.employeeGender}
                  </p>
                </div>
                <div className='flex justify-between mt-5'>
                  <p className='text-dark'>contact</p>
                  <p className='text-gray-400 '>
                    {data?.payload?.employeeContactPhone}
                  </p>
                </div>
                <div className='flex justify-between mt-5'>
                  <p className='text-dark'>School</p>
                  <p className='text-gray-400 '>
                    {' '}
                    {data?.payload?.school?.schoolName}{' '}
                  </p>
                </div>
              </div>
            </div>
          </ContentTableContainer>
        </>
      )}
    </>
  )
}

export default Private(SingleEmployee)
