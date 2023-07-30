import Col from 'antd/lib/col'
import Dropdown from 'antd/lib/dropdown'
import Row from 'antd/lib/row'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChidrenProfile from '../../../components/ChildrenProfile'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import CustomImage from '../../../components/Shared/CustomImage'
import CustomInput from '../../../components/Shared/CustomInput'
import { Empty } from '../../../components/Shared/Empty'
import {
  AppLoader
} from '../../../components/Shared/Loaders'
import Paginator from '../../../components/Shared/Paginator'
import PaymentHistoryTable from '../../../components/Tables/PaymentsTable'
import { _pagination_number_, termOptions } from '../../../config/constants'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import { useWindowSize } from '../../../helpers/useWindowSize'
import { isTokenValid } from '../../../helpers/verifyToken'
import { useGetAcademicYearsQuery } from '../../../lib/api/AcademicYear/academicYearEndpoints'
import { useGetChildrenQuery } from '../../../lib/api/Parent/childrenEndpoints'
import {
  useLazyGetSingleStudentQuery,
  usePaymentHistoryQuery
} from '../../../lib/api/Students/studentsEndpoints'

const ParentPaymentHistory = () => {
  const [id, setId] = useState('')
  const handleIsSelected = (Id) => {
    setId(Id)
  }

  const [academicYearId, setAcademicYearId] = useState('')
  const [academicTerm, setAcademicTerm] = useState('TERM1')
  const [Country, setCountry] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const { id: Id, role, country } = isTokenValid('')

  const { data: children, isLoading, isFetching } = useGetChildrenQuery()

  const isPageLoading = isLoading

  console.log({id})

  const lang = useSelector((state) => state?.translation?.payload)

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const { data: academicYears, isFetching: isAcademicYearsLoading } =
    useGetAcademicYearsQuery({})

  const { data: studentPayments, isFetching: isStudentsPaymentFetching } =
    usePaymentHistoryQuery({
      id,
      academicTerm,
      academicYearId,
      page: currentPage,
      size: _pagination_number_,
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

  const handleAcademicYearChange = (value) => {
    setAcademicYearId(value)
  }

  const [
    getSingleStudent,
    {
      data: StudentProfile,
      isLoading: isStudentLoading,
      isFetching: isStudentFecthing,
    },
  ] = useLazyGetSingleStudentQuery()

  useEffect(() => {
    handleAPIRequests({
      request: getSingleStudent,
      id,
    })
  }, [getSingleStudent, id])

  const handleTermChange = (term) => {
    setAcademicTerm(term)
  }

  const TableNavLeftSide = () => (
    <Row align='middle' gutter={20}>
      <Col>
        <p className='text-[20px] text-dark font-semibold'>
          {lang?.students_pg?.profile?.paymentTable?.title}
        </p>
      </Col>
    </Row>
  )

  const TableNavRightSide = () =>
    isScreenSmall ? (
      <Dropdown overlay={FiltersDropdown} trigger={['click']}>
        <div className='p-2 bg-gray-200 pointer rounded h-[40px] w-[42px] flex items-center'>
          <CustomImage src='/icons/filter_icon.svg' className='w-full' />
        </div>
      </Dropdown>
    ) : (
      <>
        <Row align='middle' gutter={24}>
          <Col>
            <CustomInput
              onChange={handleAcademicYearChange}
              value={academicYearId}
              type='small-select'
              label={lang?.dashboard_shared?.filters?.year?.name}
              options={[
                {
                  key: 0,
                  value: '',
                  label: lang?.dashboard_shared?.filters?.year?.sub_title,
                },
                ...academicYearsList,
              ]}
              isLoading={isAcademicYearsLoading}
            />
          </Col>

          <Col>
            <CustomInput
              type='small-select'
              label={lang?.dashboard_shared?.filters?.term?.name}
              value={academicTerm}
              onChange={handleTermChange}
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
        </Row>
      </>
    )

  const FiltersDropdown = () => (
    <div className='w-[fit-content] rounded shadow-md z-100 bg-white p-4 mt-6 flex flex-col gap-4'>
      <CustomInput
        onChange={handleAcademicYearChange}
        value={academicYearId}
        type='small-select'
        label={lang?.dashboard_shared?.filters?.year?.name}
        options={[
          {
            key: 0,
            value: '',
            label: lang?.dashboard_shared?.filters?.year?.sub_title,
          },
          ...academicYearsList,
        ]}
        isLoading={isAcademicYearsLoading}
      />

      <CustomInput
        type='small-select'
        label={lang?.dashboard_shared?.filters?.term?.name}
        value={academicTerm}
        onChange={handleTermChange}
        options={[
          {
            key: 1,
            value: '',
            label: lang?.dashboard_shared?.filters?.term?.sub_title,
          },
          ...termOptions,
        ]}
      />
    </div>
  )

  return (
    <>
      {isLoading ? (
        <AppLoader />
      ) : !children ? (
        <Empty message='The item you are looking for is not available!' />
      ) : (
        <>
          <ChidrenProfile
            handleIsSelected={handleIsSelected}
            isScreenSmall={isScreenSmall}
            data={children?.payload}
            setAcademicYearId={setAcademicYearId}
            setCountry={setCountry}
            lang={lang}
          />

          <ContentTableContainer>
            <ContentNavbar
              left={<TableNavLeftSide />}
              right={<TableNavRightSide />}
            />
            <div
              style={{ maxHeight: isScreenSmall ? '' : 'calc(100vh - 440px)' }}
              className={`mt-5 ${
                !isScreenSmall && 'h-[fit-content] overflow-x-auto'
              }`}
            >
              <PaymentHistoryTable
                data={studentPayments}
                isFetching={isStudentsPaymentFetching}
                lang={lang}
                isScreenSmall={isScreenSmall}
                profile={StudentProfile}
                role={role}
              />
              <Paginator
                total={studentPayments?.payload?.totalItems}
                setCurrentPage={setCurrentPage}
                totalPages={studentPayments?.payload?.totalPages}
              />
            </div>
          </ContentTableContainer>
        </>
      )}
    </>
  )
}

export default Private(ParentPaymentHistory)
