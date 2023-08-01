import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import CustomInput from '../../../components/Shared/CustomInput'
import { GeneralContentLoader } from '../../../components/Shared/Loaders'
import Paginator from '../../../components/Shared/Paginator'
import InstallmentTable from '../../../components/Tables/InstallmentTable'
import { _pagination_number_ } from '../../../config/constants'
import { useWindowSize } from '../../../helpers/useWindowSize'
import {
  useGetInstallmentsQuery
} from '../../../lib/api/installments/InstallmentEndpoints'

import { isTokenValid } from '../../../helpers/verifyToken'

const SchoolInstallments = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [classroomId, setClassroomId] = useState('')
  const [termId, setTermId] = useState('')
  const [academicYearId, setAcademicYearId] = useState('')
  const [search, setSearch] = useState('')
  const [studentId,setStudentId]=useState('')




  const { role, country } = isTokenValid('')

  const lang = useSelector((state) => state?.translation?.payload)

  const {
    data: installments,
    isLoading,
    isFetching,
  } = useGetInstallmentsQuery({
    page: currentPage,
    size: _pagination_number_,
    search,
    studentId
  })


  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const isPageLoading = isLoading

  const TableNavLeftSide = () => (
    <Row align='middle' gutter={20}>
      <Col>
        <p className='text-[20px] text-dark font-semibold'>
          {installments?.payload?.totalItems || ''} {lang?.installment_pg?.title}
        </p>
      </Col>
    </Row>
  )


  const onSearchChange = (value) => {
    setSearch(value)
    setCurrentPage(0)
  }

  return (
    <>

      <ContentNavbar left={<TableNavLeftSide />} right={<></>} />
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
            {/* <Col>
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
                      onChange={handleAcademicYearChange}
                      value={academicYearId}
                      type='small-select'
                      label={lang?.dashboard_shared?.filters?.year?.name}
                      options={[
                        {
                          key: 0,
                          value: '',
                          label:
                            lang?.dashboard_shared?.filters?.year?.sub_title,
                        },
                        ...academicYearsList,
                      ]}
                      isLoading={isAcademicYearsLoading}
                    />
                  </Col>

                  <Col>
                    <CustomInput
                      onChange={handleClassChange}
                      value={classroomId}
                      type='small-select'
                      label={lang?.dashboard_shared?.filters?.class?.name}
                      options={[
                        {
                          key: 0,
                          value: '',
                          label:
                            lang?.dashboard_shared?.filters?.class?.sub_title,
                        },
                        ...classesList,
                      ]}
                      isLoading={isClassLoading}
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
                          label:
                            lang?.dashboard_shared?.filters?.term?.sub_title,
                        },
                        ...termOptions,
                      ]}
                    />
                  </Col>
                </Row>
              )}
            </Col> */}
          </Row>

          <div
            style={{ maxHeight: 'calc(100vh - 310px)' }}
            className='mt-5 h-[fit-content] overflow-x-auto'
          >
            <InstallmentTable
              lang={lang}
              installments={installments}
              isFetching={isFetching}
              role={role}
            />

            <Paginator
              total={installments?.payload?.totalItems}
              setCurrentPage={setCurrentPage}
              totalPages={installments?.payload?.totalPages}
            />
          </div>
        </ContentTableContainer>
      )}
    </>
  )
}

export default Private(SchoolInstallments)
