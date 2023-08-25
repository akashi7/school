import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import CustomInput from '../../../components/Shared/CustomInput'
import {
  AppLoader,
  GeneralContentLoader,
} from '../../../components/Shared/Loaders'
import Paginator from '../../../components/Shared/Paginator'
import AllPaymentsTable from '../../../components/Tables/allPaymentsTable'
import { _pagination_number_, termOptions } from '../../../config/constants'
import { useWindowSize } from '../../../helpers/useWindowSize'
import { useGetAcademicYearsQuery } from '../../../lib/api/AcademicYear/academicYearEndpoints'
import { useGetAllAdminsPaymentsQuery } from '../../../lib/api/payments/paymentsEndpoints'

const AllPaymentsHistory = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [termId, setTermId] = useState('')
  const [academicYearId, setAcademicYearId] = useState('')
  const [studentIdentifier, setStudentIdentifier] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const {
    data: payments,
    isLoading,
    isFetching,
  } = useGetAllAdminsPaymentsQuery({
    page: currentPage,
    size: _pagination_number_,
    academicYearId,
    academicTerm: termId,
    studentIdentifier,
    from,
    to,
  })

  const { data: academicYears, isFetching: isAcademicYearsLoading } =
    useGetAcademicYearsQuery({})

  const isPageLoading = isLoading

  const lang = useSelector((state) => state?.translation?.payload)

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const academicYearsList = academicYears?.payload?.totalItems
    ? [
        ...academicYears?.payload?.items?.map((item) => ({
          key: item?.name,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  const LeftSide = () => (
    <p className='text-[20px] text-dark font-semibold'>
      {payments?.payload?.totalItems || ''} {'payments'}
    </p>
  )

  console.log({payments})

  const handleAcademicYearChange = (value) => {
    setAcademicYearId(value)
  }

  const handleTermChange = (value) => {
    setTermId(value)
  }

  const onSearchChange = (value) => {
    setStudentIdentifier(value)
    setCurrentPage(0)
  }

  const handleFrom = (from) => {
    setFrom(from)
    setCurrentPage(0)
  }
  const handleTo = (to) => {
    setTo(to)
    setCurrentPage(0)
  }

  return (
    <>
      <ContentNavbar left={<LeftSide />} />

      {/* Content */}
      {isPageLoading ? (
        <GeneralContentLoader />
      ) : (
        <ContentTableContainer>
          <Row
            align='end'
            justify='space-between'
            wrap={!isScreenSmall}
            gutter={12}
          >
            <Col>
              <div className='w-[100%]'>
                <CustomInput
                  onChange={onSearchChange}
                  placeholder={lang?.dashboard_shared?.messages?.type_to_search}
                />
              </div>
            </Col>

            <Col>
              <Row align='middle' gutter={24}>
                <Col>
                  <CustomInput
                    label={'from'}
                    type='small-date'
                    onChange={handleFrom}
                    value={from}
                  />
                </Col>
                <Col>
                  <CustomInput
                    label={'to'}
                    type='small-date'
                    onChange={handleTo}
                    value={to}
                  />
                </Col>
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
                    onChange={handleTermChange}
                    value={termId}
                    type='small-select'
                    label={lang?.dashboard_shared?.filters?.term?.name}
                    options={[
                      {
                        key: 0,
                        value: '',
                        label: lang?.dashboard_shared?.filters?.term?.sub_title,
                      },
                      ...termOptions,
                    ]}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <div
            style={{
              maxHeight: isScreenSmall ? '' : 'calc(100vh - 440px)',
            }}
            className={`mt-5 ${
              !isScreenSmall && 'h-[fit-content] overflow-x-auto'
            }`}
          >
            <AllPaymentsTable
              payments={payments}
              lang={lang}
              isFetching={isFetching}
            />
          </div>
          <Paginator
            total={payments?.payload?.totalItems}
            setCurrentPage={setCurrentPage}
            totalPages={payments?.payload?.totalPages}
          />
        </ContentTableContainer>
      )}
    </>
  )
}

export default Private(AllPaymentsHistory)
