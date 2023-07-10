import Col from 'antd/lib/col'
import Dropdown from 'antd/lib/dropdown'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NewDTypeForm from '../../../components/Forms/NewDTypeForm'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import CustomButton from '../../../components/Shared/CustomButton'
import CustomImage from '../../../components/Shared/CustomImage'
import CustomInput from '../../../components/Shared/CustomInput'
import CustomModal from '../../../components/Shared/CustomModal'
import {
  AppLoader,
  GeneralContentLoader,
} from '../../../components/Shared/Loaders'
import Paginator from '../../../components/Shared/Paginator'
import DeductibleTypesTable from '../../../components/Tables/DeductiblesTypeTable'
import { _pagination_number_ } from '../../../config/constants'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import { useWindowSize } from '../../../helpers/useWindowSize'
import { isTokenValid } from '../../../helpers/verifyToken'
import {
  useAddDeductibleTypeMutation,
  useGetDeductibleTypesQuery,
} from '../../../lib/api/deductibletypes/DeductibleTypesEndpoints'

const DeductibleTypes = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [enumaration, setEnumaration] = useState('')
  const [isOptional, setIsOptional] = useState(false)

  const { id, role, country } = isTokenValid('')

  const {
    data: types,
    isLoading,
    isFetching,
  } = useGetDeductibleTypesQuery({
    page: currentPage,
    size: _pagination_number_,
    search,
    type,
    enumaration,
  })

  const lang = useSelector((state) => state?.translation?.payload)

  const [form] = Form.useForm()

  const [addDeductibleType, { isLoading: isAddingType }] =
    useAddDeductibleTypeMutation()

  const onSuccess = () => {
    setIsVisible(false)
    setCurrentPage(0)
    setSearch('')
    setIsOptional(!isOptional)
    form.resetFields()
  }


  const handleCancel = () => {
    setIsVisible(false)
    form.resetFields()
  }

  const onSearchChange = (value) => {
    setSearch(value)
    setCurrentPage(0)
  }

  const onEnumarationChange = (value) => {
    setEnumaration(value)
    setCurrentPage(0)
  }

  const onTypeChange = (value) => {
    setType(value)
    setCurrentPage(0)
  }

  const handleIsOptional=()=>{
    setIsOptional(!isOptional)
  }

  const onAddPTypeFinish = (values) => {
    const data = {
      ...values,
      optional: !!isOptional,
      amount: parseInt(values?.amount),
    }

    handleAPIRequests({
      request: addDeductibleType,
      onSuccess: onSuccess,
      notify: true,
      // id: itemToEdit?.id,
      message: 'type added',
      ...data,
    })
  }

  const isPageLoading = isLoading

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const RightSide = () => (
    <CustomButton onClick={() => setIsVisible(true)} type='primary'>
      new Type
    </CustomButton>
  )

  const LeftSide = () => (
    <p className='text-[20px] text-dark font-semibold'>
      {types?.payload?.totalItems || ''} {'Deductible types'}
    </p>
  )

  const FiltersDropdown = (
    <div className='w-[fit-content] rounded shadow-md z-100 bg-white p-4 mt-6 flex flex-col gap-4'>
      {/* <CustomInput
        onChange={handleCurrentChange}
        value={current}
        type='small-select'
        label={lang?.dashboard_shared?.filters?.year?.name}
        options={[
          {
            key: 0,
            value: '',
            label: 'select current one',
          },
          {
            key: 1,
            value: true,
            label: 'true',
          },
          {
            key: 2,
            value: false,
            label: 'false',
          },
        ]}
      /> */}

      {/* <CustomInput
        onChange={handleEmunarationChange}
        value={emunaration}
        type='small-select'
        label={lang?.dashboard_shared?.filters?.year?.name}
        options={[
          {
            key: 0,
            value: '',
            label: 'select Emuration',
          },
          {
            key: 1,
            value: 'SALARY',
            label: 'Salary',
          },
          {
            key: 2,
            value: 'WAGES',
            label: 'Wages',
          },
        ]}
      /> */}
    </div>
  )

  return (
    <>
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        loading={isAddingType}
        width={700}
        handleCancel={handleCancel}
        title={'add New'}
        footerContent={
          <CustomButton
            loading={isAddingType}
            type='primary'
            htmlType='submit'
            form='add-d-type'
          >
            {lang?.dashboard_shared?.buttons?.save}
          </CustomButton>
        }
      >
        <NewDTypeForm
          form={form}
          onFinish={onAddPTypeFinish}
          isOptional={isOptional}
          handleIsOptional={handleIsOptional}
        />
      </CustomModal>

      <ContentNavbar left={<LeftSide />} right={<RightSide />} />
      {isPageLoading ? (
        <GeneralContentLoader />
      ) : (
        <ContentTableContainer>
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
                  placeholder={lang?.dashboard_shared?.messages?.type_to_search}
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
                      onChange={onEnumarationChange}
                      value={enumaration}
                      type='small-select'
                      label={'emunaration'}
                      options={[
                        {
                          key: 0,
                          value: '',
                          label: 'select Emuration',
                        },
                        {
                          key: 1,
                          value: 'SALARY',
                          label: 'Salary',
                        },
                        {
                          key: 2,
                          value: 'WAGES',
                          label: 'Wages',
                        },
                      ]}
                    />
                  </Col>
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
            style={{
              maxHeight: isScreenSmall
                ? 'calc(100vh - 260px)'
                : 'calc(100vh - 300px)',
            }}
            className=' mt-1 h-[fit-content] overflow-x-auto'
          >
            {isLoading ? (
              <AppLoader />
            ) : (
              <DeductibleTypesTable
                deductiblesTypes={types}
                isFetching={isFetching}
                lang={lang}
                role={role}
              />
            )}

            <Paginator
              total={types?.payload?.totalItems}
              setCurrentPage={setCurrentPage}
              totalPages={types?.payload?.totalPages}
            />
          </div>
        </ContentTableContainer>
      )}
    </>
  )
}

export default Private(DeductibleTypes)
