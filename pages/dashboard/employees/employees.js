import { LoadingOutlined } from '@ant-design/icons'
import Col from 'antd/lib/col'
import Dropdown from 'antd/lib/dropdown'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import React, { useState } from 'react'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import CustomButton from '../../../components/Shared/CustomButton'
import CustomInput from '../../../components/Shared/CustomInput'
import CustomModal from '../../../components/Shared/CustomModal'

import {
  useAddEmployeeMutation,
  useGetEmployeesQuery
} from '../../../lib/api/Employees/employeesEndpoints'

import { useDownloadPayrollMutation } from '../../../lib/api/deductibletypes/DeductibleTypesEndpoints'

import { useSelector } from 'react-redux'
import NewEmployeeForm from '../../../components/Forms/NewEmployeeForm'
import useHandleNewEmployeeForm from '../../../components/Forms/useHandleNewEmployeeForm'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import CustomImage from '../../../components/Shared/CustomImage'
import {
  AppLoader,
  GeneralContentLoader,
} from '../../../components/Shared/Loaders'
import Notify from '../../../components/Shared/Notification'
import Paginator from '../../../components/Shared/Paginator'
import { _pagination_number_ } from '../../../config/constants'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import { isImageValid } from '../../../helpers/isImageValid'
import uploadFile from '../../../helpers/uploadFile'
import { useWindowSize } from '../../../helpers/useWindowSize'
import { useGetPositionsQuery } from '../../../lib/api/positions/positionEndpoints'

import EmployeesTable from '../../../components/Tables/EmployeesTable'
import handleDownloadFile from '../../../helpers/handleDownloadFile'

const Employees = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')
  const [current, setCurrent] = useState(false)
  const [emunaration, setEmunaration] = useState('')
  const [position, setPosition] = useState('')
  const [uploadLoading, setUploadLoading] = useState(false)
  const [imgURL, setImgURL] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(null)
  const [positionId, setPositionId] = useState('')

  const handleCancel = () => {
    setItemToEdit(null)
    setIsVisible(false)
    setImgURL(null)
  }

  const {
    data: employees,
    isLoading,
    isFetching,
  } = useGetEmployeesQuery({
    page: currentPage,
    size: _pagination_number_,
    emunaration,
    current,
    search,
    position,
  })

  const { data: positions, isFetching: isPositionLoading } =
    useGetPositionsQuery({
      page: currentPage,
      size: _pagination_number_,
      search: '',
    })

  const positionsList = positions?.payload?.items?.length
    ? [
        ...positions?.payload?.items?.map((item) => ({
          key: item?.id,
          value: item?.name,
          label: item.name,
        })),
      ]
    : []

  const lang = useSelector((state) => state?.translation?.payload)

  // const [
  // 	getSingleStudent,
  // 	{ data: studentData, isFetching: isGetStudentLoading },
  // ] = useLazyGetSingleStudentQuery();

  // const { data: academicYears, isFetching: isAcademicYearsLoading } =
  // 	useGetAcademicYearsQuery({});

  // const [getStreams, { data: streams, isFetching: isStreamLoading }] =
  // 	useLazyGetStreamsQuery();

  const [addEmployee, { isLoading: isAddingEmployee }] =
    useAddEmployeeMutation()

  // const [editStudent, { isLoading: isEditingStudent }] =
  // 	useEditStudentMutation();

  // const classroomIDFromResponse =
  // 	itemToEdit?.studentPromotions.length &&
  // 	itemToEdit?.studentPromotions[0]?.stream?.classroom?.id;

  // const canFetchStreams =
  // 	classroomId || newStudentSelectedClassroomId || classroomIDFromResponse;

  // useEffect(() => {
  // 	if (itemToEdit) {
  // 		handleAPIRequests({
  // 			request: getSingleStudent,
  // 			id: itemToEdit?.id,
  // 			onError: handleCancel,
  // 		});
  // 	}
  // }, [getSingleStudent, itemToEdit]);

  // useEffect(() => {
  // 	setImgURL(studentData?.payload?.passportPhoto);
  // }, [studentData]);

  const [form] = Form.useForm()

  const onSuccess = () => {
    setIsVisible(false)
    setCurrentPage(0)
    setSearch('')
    setEmunaration('')
    setCurrent(false)
    form.resetFields()
  }

  const onAddEmployeeFinish = (values) => {
    const data = {
      ...values,
      countryCode: selectedCountry?.code,
      employeePassportPhoto: imgURL,
      AccountNumber: parseInt(values.AccountNumber),
      amount: parseInt(values.amount),
      positionId,
    }

    handleAPIRequests({
      request: addEmployee,
      onSuccess: onSuccess,
      notify: true,
      id: itemToEdit?.id,
      message: itemToEdit
        ? lang?.alert_messages?.success?.edit_student
        : lang?.alert_messages?.success?.add_student,
      ...data,
    })
  }

  const onSearchChange = (value) => {
    setSearch(value)
    setCurrentPage(0)
  }

  const handleEmunarationChange = (value) => {
    setEmunaration(value)
    setCurrentPage(0)
  }

  const handleCurrentChange = (value) => {
    setCurrent(value)
    setCurrentPage(0)
  }

  const handlePositionChange = (value) => {
    setPosition(value)
    setCurrentPage(0)
  }

  const handleUploadProfile = (files) => {
    const isValid = isImageValid(files)

    isValid
      ? uploadFile({
          files,
          setUploadLoading,
          setImgURL,
        })
      : Notify({
          message: 'Invalid file type',
          description:
            'Only, PNG, JPG, JPEG Images are valid formats to be uploaded!',
          type: 'error',
        })
  }

  useHandleNewEmployeeForm({
    form,
    // itemToEdit: itemToEdit ? studentData?.payload : null,
  })

  const handleDownloadReportSuccess = (file) => {
    handleDownloadFile({ name: 'Payroll-Report', file })
  }

  const handleDownloadPayrollReport = () => {
    handleAPIRequests({
      request: downloadReport,
      onSuccess: handleDownloadReportSuccess,
      notify: true,
    })
  }

  const [downloadReport, { isLoading: isDownloadLoading }] =
    useDownloadPayrollMutation()

  const isPageLoading = isLoading

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const DownloadOverlay = (
    <div className='p-4 w-[100%] bg-gray-200 rounded shadow-sm'>
      <p
        className='transition ease-in-out delay-120 mb-2 hover:bg-gray-300 hover:p-2 hover:px-4 hover:rounded pointer'
        onClick={() => handleDownloadPayrollReport()}
      >
        {'Download'}
      </p>
    </div>
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
      <Col>
        <CustomButton onClick={() => setIsVisible(true)} type='primary'>
        {lang?.employee_pg?.new_btn}
        </CustomButton>
      </Col>
    </Row>
  )

  const LeftSide = () => (
    <p className='text-[20px] text-dark font-semibold'>
      {employees?.payload?.totalItems || ''} {lang?.employee_pg?.title}
    </p>
  )

  const FiltersDropdown = (
    <div className='w-[fit-content] rounded shadow-md z-100 bg-white p-4 mt-6 flex flex-col gap-4'>
      <CustomInput
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
      />

      <CustomInput
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
      />
    </div>
  )

  return (
    <>
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        loading={isAddingEmployee}
        width={700}
        handleCancel={handleCancel}
        title={'add Employee'}
        footerContent={
          <CustomButton
            loading={isAddingEmployee || uploadLoading}
            type='primary'
            htmlType='submit'
            form='add-employee'
          >
            {lang?.dashboard_shared?.buttons?.save}
          </CustomButton>
        }
      >
        <NewEmployeeForm
          form={form}
          onFinish={onAddEmployeeFinish}
          uploadLoading={uploadLoading}
          handleUploadProfile={handleUploadProfile}
          setSelectedCountry={setSelectedCountry}
          imgURL={imgURL || itemToEdit?.passportPhoto}
          setPositionId={setPositionId}
          positionId={positionId}
        />
      </CustomModal>

      <ContentNavbar left={<LeftSide />} right={<RightSide />} />

      {/* Content */}
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
                      onChange={handleEmunarationChange}
                      value={emunaration}
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
                      onChange={handlePositionChange}
                      value={position}
                      type='small-select'
                      label={'position'}
                      options={[
                        {
                          key: 0,
                          value: '',
                          label: 'Select position',
                        },
                        ...positionsList,
                      ]}
                      isLoading={isPositionLoading}
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
              <EmployeesTable
                employees={employees?.payload?.items}
                lang={lang}
                isFetching={isFetching}
                setItemToEdit={setItemToEdit}
                setIsEditModalVisible={setIsVisible}
              />
            )}

            <Paginator
              total={employees?.payload?.totalItems}
              setCurrentPage={setCurrentPage}
              totalPages={employees?.payload?.totalPages}
            />
          </div>
        </ContentTableContainer>
      )}
    </>
  )
}

export default Private(Employees)
