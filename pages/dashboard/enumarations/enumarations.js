import { LoadingOutlined } from '@ant-design/icons'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import EmployeeProfile from '../../../components/EmployeeProfile'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import { Empty } from '../../../components/Shared/Empty'
import { AppLoader } from '../../../components/Shared/Loaders'
import EnumarationTable from '../../../components/Tables/enumarationTable'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import handleDownloadFile from '../../../helpers/handleDownloadFile'
import { useWindowSize } from '../../../helpers/useWindowSize'
import { isTokenValid } from '../../../helpers/verifyToken'
import { useLazyGetSingleEmployeeQuery } from '../../../lib/api/Employees/employeesEndpoints'
import { useDownloadPayrollMutation } from '../../../lib/api/deductibletypes/DeductibleTypesEndpoints'





const EmployeeEnumaration = () => {
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

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const handleDownloadReportSuccess = (file) => {
    handleDownloadFile({ name: 'Payroll-Report', file })
  }

  const handleDownloadPayrollReport = () => {
    handleAPIRequests({
      request: downloadReport,
      id,
      onSuccess: handleDownloadReportSuccess,
      notify: true,
    })
  }

  const [downloadReport, { isLoading: isDownloadLoading }] =
    useDownloadPayrollMutation()

  const TableNavLeftSide = () => (
    <Row align='middle' gutter={20}>
      <Col>
        <p className='text-[20px] text-dark font-semibold'>
          {/* {lang?.students_pg?.profile?.table?.title} */} Enumarations
        </p>
      </Col>
    </Row>
  )

  const RightSide = () => (
    <Row gutter={24} align='middle'>
      <Col>
        <div onClick={() => handleDownloadPayrollReport()} className='p-2 w-[100%] bg-gray-200 rounded shadow-sm '>
          {isDownloadLoading && (
            <LoadingOutlined style={{ fontSize: 16 }} spin />
          )}
          <span
            className={`${
              isDownloadLoading ? 'opacity-60' : 'opacity-1'
            }  text-[14px] font-medium cursor-pointer`}
          >
            {"Download Payroll report"}
          </span>

          {/* <CustomImage
            src='/icons/expand.svg'
            width={14}
            height={14}
            className={` ${
              isDownloadLoading ? 'opacity-60' : 'opacity-1'
            }  object-cover rounded-full`}
          /> */}
        </div>
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
              right={<RightSide />}
            />

            <div
              style={{ maxHeight: isScreenSmall ? '' : 'calc(100vh - 440px)' }}
              className={`mt-5 ${
                !isScreenSmall && 'h-[fit-content] overflow-x-auto'
              }`}
            >
              <EnumarationTable
                enumaration={data?.payload?.employeeSalary}
                isFetching={isFetching}
                lang={lang}
              />
            </div>
          </ContentTableContainer>
        </>
      )}
    </>
  )
}

export default Private(EmployeeEnumaration)
