import Table from 'antd/lib/table'
import { useState } from 'react'
import { toLocalString } from '../../helpers/numbers'
import { useGetAllAdminsPaymentsQuery } from '../../lib/api/payments/paymentsEndpoints'
import { useGetAcademicYearsQuery } from '../../lib/api/AcademicYear/academicYearEndpoints'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import CustomInput from '../Shared/CustomInput'
import ContentTableContainer from '../Shared/ContentTableContainer'

import { termOptions } from '../../config/constants'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useWindowSize } from '../../helpers/useWindowSize'
import Paginator from '../Shared/Paginator'
import {MobileTableLoader} from '../Shared/Loaders'


const { Column } = Table

const inActiveTabClasses = 'bg-gray-200 text-gray-500 hover:text-black'
const activeTabClasses = 'hover:bg-dark hover:text-white bg-dark text-white'

const AnalyticsTable = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [termId, setTermId] = useState('')
  const [academicYearId, setAcademicYearId] = useState('')
  const [studentIdentifier, setStudentIdentifier] = useState('')

  const {
    data: payments,
    isLoading,
    isFetching,
  } = useGetAllAdminsPaymentsQuery({
    page: currentPage,
    size: 10,
    academicYearId,
    academicTerm: termId,
    studentIdentifier,
  })

  const { data: academicYears, isFetching: isAcademicYearsLoading } =
    useGetAcademicYearsQuery({})

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

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const lang = useSelector((state) => state?.translation?.payload)

  const academicYearsList = academicYears?.payload?.totalItems
    ? [
        ...academicYears?.payload?.items?.map((item) => ({
          key: item?.name,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  return (
    <div className='mt-6 '>
      <ContentTableContainer>
        <Row align='end' justify='space-between' gutter={12}>
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
            !isScreenSmall && 'h-[fit-content] overflow-x-auto '
          }`}
        >
          {isScreenSmall ? (
            <div>
              <div
                className={`grid grid-cols-1 relative ${
                  payments?.payload?.items?.length <= 1
                    ? 'sm:grid-cols-1 md:grid-cols-1'
                    : 'sm:grid-cols-2 md:grid-cols-2'
                } gap-4`}
              >
                {isFetching && <MobileTableLoader />}
                {payments?.payload?.items?.map((record) => (
                  <div
                    key={record?.id}
                    className='shadow-md p-4 bg-white border rounded'
                  >
                    <Row
                      align='top'
                      justify='space-between'
                      wrap={false}
                      className='mb-2'
                    >
                      <Col>
                        <span className='block font-bold text-[18px]'>
                          {moment(record?.date).format('YYYY-MM-DD')}
                        </span>
                      </Col>
                    </Row>

                    <span className='text-[14px] block mt-1'>
                      {lang?.fees_pg?.table?.name}:{' '}
                      <span className='text-edit_blue font-medium'>
                        {record?.student?.fullName}
                      </span>
                    </span>

                    <span className='text-[14px] block mt-4'>
                      {lang?.fees_pg?.table?.year}
                      <span className='text-gray-500'>
                        {record?.academicYear?.name}
                      </span>
                    </span>

                    <span className='text-[14px] block mt-1'>
                      {lang?.students_pg?.profile?.paymentTable?.term}:{' '}
                      <span className='text-gray-500 bg-edit_bg font-medium'>
                        {record?.academicTerm}
                      </span>
                    </span>
                    <span className='text-[14px] block mt-1'>
                      {lang?.students_pg?.profile?.paymentTable?.amount}:{' '}
                      <span className='text-gray-500 font-medium'>
                        {toLocalString(record?.amount || 0)} Rwf
                      </span>
                    </span>
                    <span className='text-[14px] block mt-1'>
                      {lang?.students_pg?.profile?.paymentTable?.method}:{' '}
                      <span className='text-gray-500 font-medium'>
                        {record?.paymentMethod}
                      </span>
                    </span>
                    <span className='text-[14px] block mt-1'>
                      {lang?.students_pg?.profile?.paymentTable?.status}:{' '}
                      <span
                        className={` p-1 rounded font-medium  ${
                          record?.status === 'PENDING'
                            ? 'text-black bg-edit_bg '
                            : record?.status === 'SUCCESS'
                            ? 'text-white bg-[#198754] '
                            : 'text-white bg-[#ff0000]'
                        }`}
                      >
                        {record?.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Table
              className='data_table'
              dataSource={payments?.payload?.items}
              rowKey={(record) => {
                return record?.id
              }}
              rowClassName='shadow'
              pagination={false}
              loading={isFetching}
              bordered={false}
              scroll={{ x: 0 }}
            >
              <Column
                title='#'
                key='#'
                width={24}
                render={(text, record, index) => (
                  <span className='text-gray-500'>{index + 1}.</span>
                )}
              />

              <Column
                title={lang?.students_pg?.profile?.paymentTable?.date}
                key='date'
                render={(record) => (
                  <span className='font-bold'>
                    {moment(record?.date).format('YYYY-MM-DD')}
                  </span>
                )}
              />
              <Column
                title={lang?.fees_pg?.table?.name}
                key='student'
                render={(record) => (
                  <span className='font-bold'>{record?.student?.fullName}</span>
                )}
              />

              <Column
                title={lang?.fees_pg?.table?.year}
                key='year'
                render={(record) => <span>{record?.academicYear?.name}</span>}
              />

              <Column
                title={lang?.students_pg?.profile?.paymentTable?.term}
                key='academicTerm'
                render={(record) => (
                  <span className='font-bold'>{record?.academicTerm}</span>
                )}
              />

              <Column
                title={lang?.students_pg?.profile?.paymentTable?.amount}
                key='amount'
                render={(record) => (
                  <span>{toLocalString(record?.amount || 0)} Rwf</span>
                )}
              />

              <Column
                title={lang?.students_pg?.profile?.paymentTable?.method}
                key='paymentMethod'
                render={(record) => (
                  <span className='text-black font-semibold'>
                    {record?.paymentMethod}
                  </span>
                )}
              />
              <Column
                title={lang?.students_pg?.profile?.paymentTable?.status}
                key='status'
                render={(record) => (
                  <span
                    className={` p-3 rounded font-medium  ${
                      record?.status === 'PENDING'
                        ? 'text-black bg-edit_bg '
                        : record?.status === 'SUCCESS'
                        ? 'text-white bg-[#198754] '
                        : 'text-white bg-[#ff0000]'
                    }`}
                  >
                    {record?.status}
                  </span>
                )}
              />
            </Table>
          )}

          <Paginator
            total={payments?.payload?.totalItems}
            setCurrentPage={setCurrentPage}
            totalPages={payments?.payload?.totalPages}
          />
        </div>
      </ContentTableContainer>
    </div>
  )
}

export default AnalyticsTable
