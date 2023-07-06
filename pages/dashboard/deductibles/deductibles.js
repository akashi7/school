import React, { useEffect, useState } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Dropdown from 'antd/lib/dropdown'
import StudentProfile from '../../../components/StudentProfile'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import CustomInput from '../../../components/Shared/CustomInput'
import AssignedFeesTable from '../../../components/Tables/AssignedFeesTable'
import Paginator from '../../../components/Shared/Paginator'

import moment from 'moment'
import {
  useGetStudentFeesQuery,
  useLazyGetSingleStudentQuery,
} from '../../../lib/api/Students/studentsEndpoints'
import { useLazyGetSingleEmployeeQuery } from '../../../lib/api/Employees/employeesEndpoints'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import Private from '../../../components/Routes/Private'
import { AppLoader } from '../../../components/Shared/Loaders'
import { Empty } from '../../../components/Shared/Empty'
import { useGetAcademicYearsQuery } from '../../../lib/api/AcademicYear/academicYearEndpoints'
import { termOptions } from '../../../config/constants'
import { isTokenValid } from '../../../helpers/verifyToken'
import { useSelector } from 'react-redux'
import { useWindowSize } from '../../../helpers/useWindowSize'
import CustomImage from '../../../components/Shared/CustomImage'
import EmployeeProfile from '../../../components/EmployeeProfile'
import { _pagination_number_ } from '../../../config/constants'
import { useGetDeductibleTypesQuery } from '../../../lib/api/deductibletypes/DeductibleTypesEndpoints'
import DeductibleTypesTable from '../../../components/Tables/DeductiblesTypeTable'


const EmployeeDeductibles = () => {
  const { id, role, country } = isTokenValid('')

  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')

  const lang = useSelector((state) => state?.translation?.payload)

  const enumaration = localStorage.getItem('enu')

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


  const { data: types, isFetching: isDeductiblesFetching,isLoading:DeductibleLoding } = 
    useGetDeductibleTypesQuery({
      page: currentPage,
      size: _pagination_number_,
      search,
      type,
      enumaration,
    })

  const TableNavLeftSide = () => (
    <Row align='middle' gutter={20}>
      <Col>
        <p className='text-[20px] text-dark font-semibold'>
          {types?.payload?.totalItems || ''} {'deductible'}
        </p>
      </Col>
    </Row>
  )

  const onSearchChange = (value) => {
    setSearch(value)
    setCurrentPage(0)
  }

  const onTypeChange = (value) => {
    setType(value)
    setCurrentPage(0)
  }


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
    </>
  )
}

export default Private(EmployeeDeductibles)
