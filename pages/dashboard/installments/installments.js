import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NewInstallment from '../../../components/Forms/NewInstallment'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import CustomButton from '../../../components/Shared/CustomButton'
import CustomInput from '../../../components/Shared/CustomInput'
import CustomModal from '../../../components/Shared/CustomModal'
import { GeneralContentLoader } from '../../../components/Shared/Loaders'
import Paginator from '../../../components/Shared/Paginator'
import InstallmentTable from '../../../components/Tables/InstallmentTable'
import { _pagination_number_ } from '../../../config/constants'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import { useWindowSize } from '../../../helpers/useWindowSize'
import { useGetFeesQuery } from '../../../lib/api/Fees/FeesEndpoints'
import {
  useAddInstallmentMutation,
  useGetInstallmentsQuery,
} from '../../../lib/api/installments/InstallmentEndpoints'

import ChidrenProfile from '../../../components/ChildrenProfile'
import { useGetChildrenQuery } from '../../../lib/api/Parent/childrenEndpoints'
import { isTokenValid } from '../../../helpers/verifyToken'
import userType from '../../../helpers/userType'

const Installments = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [classroomId, setClassroomId] = useState('')
  const [termId, setTermId] = useState('')
  const [academicYearId, setAcademicYearId] = useState('')
  const [search, setSearch] = useState('')

  const [id, setId] = useState('')
  const handleIsSelected = (Id) => {
    setId(Id)
  }

  const [Country, setCountry] = useState('')

  const [installmentNumber, setInstallmentNumber] = useState(0)
  const { id: Id, role, country } = isTokenValid('')

  const lang = useSelector((state) => state?.translation?.payload)

  const onChange = (e) => {
    setInstallmentNumber(0)
    setInstallmentNumber(!e ? 0 : installmentNumber + parseInt(e))
  }

  const {
    data: installments,
    isLoading,
    isFetching,
  } = useGetInstallmentsQuery({
    page: currentPage,
    size: _pagination_number_,
    search,
    studentId: id ? id : '',
  })

  const {
    data: fees,
    isLoading: feesLoading,
    isFetching: feesFecthing,
  } = useGetFeesQuery({
    page: currentPage,
    size: _pagination_number_,
    installment: true,
  })

  console.log({ fees })

  const [addInstallment, { isLoading: isAddingInstallment }] =
    useAddInstallmentMutation()

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024
  const [form] = Form.useForm()

  const isPageLoading = isLoading

  const TableNavLeftSide = () => (
    <Row align='middle' gutter={20}>
      <Col>
        <p className='text-[20px] text-dark font-semibold'>
          {installments?.payload?.totalItems || ''} {'installment(s)'}
        </p>
      </Col>
    </Row>
  )

  const RightSide = () => (
    <>
      {(userType(role).isParent ||
        userType(role).isStudent ||
        userType(role).isrelative) && (
        <CustomButton onClick={() => setIsVisible(true)} type='primary'>
          new Installment
        </CustomButton>
      )}
    </>
  )

  const onSuccess = () => {
    setIsVisible(false)
    setCurrentPage(0)
    setInstallmentNumber(0)
    form.resetFields()
  }

  const {
    data: children,
    isLoading: Loading,
    isFetching: Fecthing,
  } = useGetChildrenQuery()

  const onAddInstallmentFinish = (values) => {
    const newValues = values?.installments?.map((value) => {
      return {
        date: value.date,
        amount: parseInt(value.amount),
      }
    })
    const data = {
      ...values,
      installmentNumber: parseInt(installmentNumber),
      studentId: id ? id : Id,
      installments: newValues,
    }

    handleAPIRequests({
      request: addInstallment,
      notify: true,
      ...data,
      onSuccess: onSuccess,
    })
  }

  const onSearchChange = (value) => {
    setSearch(value)
    setCurrentPage(0)
  }

  return (
    <>
      {userType(role).isParent && (
        <ChidrenProfile
          handleIsSelected={handleIsSelected}
          isScreenSmall={isScreenSmall}
          data={children?.payload}
          setAcademicYearId={setAcademicYearId}
          setCountry={setCountry}
          lang={lang}
        />
      )}

      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        loading={isAddingInstallment}
        handleCancel={onSuccess}
        width={550}
        title={'Add installment'}
        footerContent={
          <CustomButton
            loading={isAddingInstallment}
            type='primary'
            htmlType='submit'
            form='add-installment'
          >
            {lang?.dashboard_shared?.buttons?.save}
          </CustomButton>
        }
      >
        <NewInstallment
          form={form}
          fees={fees}
          setInstallmentNumber={setInstallmentNumber}
          installmentNumber={installmentNumber}
          onFinish={onAddInstallmentFinish}
          onChange={onChange}
        />
      </CustomModal>

      <ContentNavbar left={<TableNavLeftSide />} right={<RightSide />} />
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

export default Private(Installments)
