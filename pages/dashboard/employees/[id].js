import Col from 'antd/lib/col'
import Dropdown from 'antd/lib/dropdown'
import Row from 'antd/lib/row'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EmployeeProfile from '../../../components/EmployeeProfile'
import Layout from '../../../components/Layout'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import CustomImage from '../../../components/Shared/CustomImage'
import CustomInput from '../../../components/Shared/CustomInput'
import { Empty } from '../../../components/Shared/Empty'
import { AppLoader } from '../../../components/Shared/Loaders'
import Paginator from '../../../components/Shared/Paginator'
import DeductibleTypesTable from '../../../components/Tables/DeductiblesTypeTable'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import { useWindowSize } from '../../../helpers/useWindowSize'
import { isTokenValid } from '../../../helpers/verifyToken'
import { useLazyGetSingleEmployeeQuery } from '../../../lib/api/Employees/employeesEndpoints'
import { useGetDeductibleTypesQuery } from '../../../lib/api/deductibletypes/DeductibleTypesEndpoints'

const SingleEmployee = () => {
  const router = useRouter()
  const { id } = router.query

  const { role, country } = isTokenValid('')

  const lang = useSelector((state) => state?.translation?.payload)

  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const [enumaration, setEmunaration] = useState('')

  const [getSingleEmployee, { data, isLoading, isFetching }] =
    useLazyGetSingleEmployeeQuery()

  console.log({ data })

  useEffect(() => {
    if (data?.payload) {
      setEmunaration(data?.payload?.employeeSalary[0].name)
    }
  }, [data?.payload])

  const {
    data: types,
    isFetching: isDeductiblesFetching,
    isLoading: DeductibleLoding,
  } = useGetDeductibleTypesQuery({
    page: currentPage,
    size: 10,
    search,
    type,
    enumaration,
  })

  useEffect(() => {
    handleAPIRequests({
      request: getSingleEmployee,
      id,
    })
  }, [getSingleEmployee, id])

  useEffect(() => {
    if (data) {
      let es = data?.payload?.employeeSalary?.map((arr) => arr?.name)
      localStorage.setItem('enu', es?.toString())
    }
  }, [data])

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const onSearchChange = (value) => {
    setSearch(value)
    setCurrentPage(0)
  }

  const onTypeChange = (value) => {
    setType(value)
    setCurrentPage(0)
  }

  const TableNavLeftSide = () => (
    <Row align='middle' gutter={20} >
      <Col>
        <p className='text-[20px] text-dark font-semibold'>
          {/* {lang?.students_pg?.profile?.table?.title} */} Employee Deductibles
        </p>
      </Col>
    </Row>
  )

  return (
    <Layout>
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
             <br/>
            <Row
              align='middle'
              justify='space-between'
              wrap={!isScreenSmall}
              gutter={12}
            >
              <Col>
                <div className='w-[100%]'>
                  <CustomInput
                    onChange={onSearchChange}
                    placeholder={
                      lang?.dashboard_shared?.messages?.type_to_search
                    }
                  />
                </div>
              </Col>

              <Col className='mb-3'>
                {isScreenSmall ? (
                  <Dropdown overlay={FiltersDropdown} trigger={['click']}>
                    <div className='p-2 bg-gray-200 pointer rounded h-[40px] w-[42px] flex items-center'>
                      <CustomImage
                        src='/icons/filter_icon.svg'
                        className='w-full'
                      />
                    </div>
                  </Dropdown>
                ) : (
                  <Row align='middle' gutter={24}>
                    <Col>
                      <CustomInput
                        onChange={onTypeChange}
                        value={type}
                        type='small-select'
                        label={'type'}
                        options={[
                          {
                            key: 0,
                            value: '',
                            label: 'Select Type',
                          },
                          {
                            key: 1,
                            value: 'FLAT',
                            label: 'Flat',
                          },
                          {
                            key: 2,
                            value: 'PERCENTAGE',
                            label: 'Percentage',
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            <div
              style={{ maxHeight: isScreenSmall ? '' : 'calc(100vh - 440px)' }}
              className={`mt-5 ${
                !isScreenSmall && 'h-[fit-content] overflow-x-auto'
              }`}
            >
              <DeductibleTypesTable
                deductiblesTypes={types}
                isFetching={isDeductiblesFetching}
                lang={lang}
                role={role}
                isView={false}
              />

              <Paginator
                total={types?.payload?.totalItems}
                setCurrentPage={setCurrentPage}
                totalPages={types?.payload?.totalPages}
              />
            </div>
          </ContentTableContainer>
        </>
      )}
    </Layout>
  )
}

export default Private(SingleEmployee)
