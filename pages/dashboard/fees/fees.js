import React, { useEffect, useState, useRef } from 'react'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import { LoadingOutlined } from '@ant-design/icons'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import CustomButton from '../../../components/Shared/CustomButton'
import CustomModal from '../../../components/Shared/CustomModal'
import CustomInput from '../../../components/Shared/CustomInput'
import Private from '../../../components/Routes/Private'
import { useGetClassesQuery } from '../../../lib/api/Classrooms/classroomsEndpoints'
import { GeneralContentLoader } from '../../../components/Shared/Loaders'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import FeesTable from '../../../components/Tables/FeesTable'
import { termOptions, _pagination_number_ } from '../../../config/constants'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import NewFeeForm from '../../../components/Forms/NewFeeForm'
import {
  useAddFeeMutation,
  useDownloadFeesMutation,
  useEditFeeMutation,
  useGetFeesQuery,
  useDownloadPdfFeesMutation,
} from '../../../lib/api/Fees/FeesEndpoints'
import Paginator from '../../../components/Shared/Paginator'
import { Empty } from '../../../components/Shared/Empty'
import { useGetAcademicYearsQuery } from '../../../lib/api/AcademicYear/academicYearEndpoints'
import { Dropdown } from 'antd'
import CustomImage from '../../../components/Shared/CustomImage'
import handleDownloadFile from '../../../helpers/handleDownloadFile'
import { useSelector } from 'react-redux'
import { useWindowSize } from '../../../helpers/useWindowSize'
import Notify from '../../../components/Shared/Notification'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'

const Students = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')
  const [classroomId, setClassroomId] = useState('')
  const [feeType, setFeeType] = useState('')
  const [termId, setTermId] = useState('')
  const [itemToEdit, setItemToEdit] = useState(null)
  const [isPaymentOPtional, setIsPaymentOPtional] = useState(false)
  const [isPaymentAdditional, setIsPaymentAdditional] = useState(false)
  const [academicYearId, setAcademicYearId] = useState('')
  const [classroomPdf, setClassrooPdf] = useState(false)
  const [total, setTotal] = useState({})

  const [classPdf, setClassPdf] = useState([])

  const lang = useSelector((state) => state?.translation?.payload)

  const [form] = Form.useForm()

  const handleCancelEditModal = () => {
    setIsVisible(false)
    setItemToEdit(null)
    form.resetFields()
  }

  const ref = useRef()

  useEffect(() => {
    setIsPaymentOPtional(itemToEdit?.optional)
    setIsPaymentAdditional(itemToEdit && itemToEdit?.type !== 'SCHOOL_FEE')
  }, [itemToEdit])

  const {
    data: fees,
    isLoading,
    isFetching,
  } = useGetFeesQuery({
    page: currentPage,
    size: _pagination_number_,
    search,
    classroomId,
    term: termId,
    type: feeType,
    academicYearId,
    installment: false,
  })

  const { data: classes, isFetching: isClassLoading } = useGetClassesQuery({})
  const { data: academicYears, isFetching: isAcademicYearsLoading } =
    useGetAcademicYearsQuery({})

  const [addFee, { isLoading: isAddingFee }] = useAddFeeMutation()
  const [editFee, { isLoading: isEditingFee }] = useEditFeeMutation()
  const [downloadReport, { isLoading: isDownloadLoading }] =
    useDownloadFeesMutation()
  const [downloadPdfFees, { isLoading: isDownload }] =
    useDownloadPdfFeesMutation()

  const onSuccess = () => {
    setIsVisible(false)
    setCurrentPage(0)
    setSearch('')
    setClassroomId('')
    setFeeType('')
    setTermId('')
    setIsPaymentAdditional(false)
    setIsPaymentOPtional(false)
    setAcademicYearId('')
    form.resetFields()
  }

  const handleEditFeeSuccess = () => {
    setIsVisible(false)
    form.resetFields()
  }

  const handleDownloadReportSuccess = (file) => {
    handleDownloadFile({ name: 'Fees-Report', file })
  }

  const onAddFeeFinish = (values) => {
    const data = {
      ...values,
      optional: !!isPaymentOPtional,
      type: isPaymentAdditional ? 'ADDITIONAL_FEE' : 'SCHOOL_FEE',
      amount: +values?.amount,
    }

    handleAPIRequests({
      request: itemToEdit ? editFee : addFee,
      notify: true,
      ...data,
      id: itemToEdit?.id,
      onSuccess: itemToEdit ? handleEditFeeSuccess : onSuccess,
    })
  }

  const onSearchChange = (value) => {
    setSearch(value)
    setCurrentPage(0)
  }

  const handleClassChange = (value) => {
    setClassroomId(value)
  }

  const handleTermChange = (value) => {
    setTermId(value)
  }

  const handleFeeTypeChange = (value) => {
    setFeeType(value)
  }

  const handleDownloadFeeReport = (url) => {
    if (url === 'classrooms' && !termId) {
      Notify({
        message: 'Error',
        description: 'Please select academic term to download report!',
        type: 'error',
      })
      return
    }
    handleAPIRequests({
      request: downloadReport,
      search,
      classroomId,
      term: termId,
      type: feeType,
      academicYearId,
      url,
      onSuccess: handleDownloadReportSuccess,
      notify: true,
    })
  }

  const ClassrommPdfSucess = (res) => {
    setTotal(res?.payload?.total)
    setClassPdf(res?.payload?.streamsData)
  }

  const handlePdf = (url) => {
    handleAPIRequests({
      request: downloadPdfFees,
      search,
      classroomId,
      term: termId,
      type: feeType,
      academicYearId,
      onSuccess: ClassrommPdfSucess,
      notify: true,
    })
  }

  useEffect(() => {
    if (classroomPdf) {
      handlePdf('classrooms')
    }
    //eslint-disable-next-line
  }, [classroomPdf])

  const showEmpty = fees?.payload?.totalItems <= 0

  const isPageLoading = isLoading

  const handleAcademicYearChange = (value) => {
    setAcademicYearId(value)
  }

  const handleCancel =()=>{
    setClassrooPdf(false)
  }


  const handleDownloadPDF = async () => {
    const image = await toPng(ref.current)
    const pdf = new jsPDF()
    pdf.addImage(image, 'PNG', 10, 10, 190, 0)
    pdf.save(`class clearence list`)
  }

  const classesList = classes?.payload?.items?.length
    ? [
        ...classes?.payload?.items?.map((item) => ({
          key: item?.id,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  const academicYearsList = academicYears?.payload?.totalItems
    ? [
        ...academicYears?.payload?.items?.map((item) => ({
          key: item?.name,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const DownloadOverlay = (
    <div className='p-4 w-[100%] bg-gray-200 rounded shadow-sm'>
      <p
        className='transition ease-in-out delay-120 mb-2 hover:bg-gray-300 hover:p-2 hover:px-4 hover:rounded pointer'
        onClick={() => handleDownloadFeeReport('students')}
      >
        {lang?.fees_pg?.download_btn?.for_students}
      </p>

      <p
        className='transition ease-in-out delay-120 hover:bg-gray-300 hover:p-2 hover:px-4 hover:rounded pointer'
        onClick={() => handleDownloadFeeReport('classrooms')}
      >
        {lang?.fees_pg?.download_btn?.for_classrooms}
      </p>
      {/* <p
        className='transition ease-in-out delay-120 mb-2 hover:bg-gray-300 hover:p-2 hover:px-4 hover:rounded pointer'
        onClick={() => handleDownloadFeeReport('students')}
      >
        {lang?.fees_pg?.download_btn?.pdf_for_students}
      </p> */}
      {classroomId && termId && (
        <p
          className='transition  mt-3 ease-in-out delay-120 hover:bg-gray-300 hover:p-2 hover:px-4 hover:rounded pointer'
          onClick={() => setClassrooPdf(true)}
        >
          {lang?.fees_pg?.download_btn?.pdf_for_classroom}
        </p>
      )}
    </div>
  )

  const RightSide = () => (
    <Row gutter={24} align='middle'>
      <Col>
        <Dropdown
          overlay={
            isDownloadLoading || !academicYearId ? <></> : DownloadOverlay
          }
          trigger={['click']}
        >
          {isScreenSmall ? (
            <div className='w-[32px] h-[32px] rounded hover:bg-gray-500 flex items-center justify-center bg-gray-200'>
              <CustomImage
                src='/icons/download.svg'
                width={18}
                height={18}
                className={`${!academicYearId ? 'opacity-60' : 'opacity-1'}`}
              />
            </div>
          ) : (
            <div
              className={`flex items-center gap-6 bg-gray-200 p-4 py-3 rounded ${
                isDownloadLoading || !academicYearId
                  ? 'cursor-not-allowed'
                  : ' cursor-pointer'
              }`}
            >
              {isDownloadLoading ? (
                <LoadingOutlined style={{ fontSize: 16 }} spin />
              ) : (
                <CustomImage
                  src='/icons/download.svg'
                  width={18}
                  height={18}
                  className={`${!academicYearId ? 'opacity-60' : 'opacity-1'}`}
                />
              )}

              <span
                className={`${
                  isDownloadLoading || !academicYearId
                    ? 'opacity-60'
                    : 'opacity-1'
                }  text-[14px] font-medium ml-2`}
              >
                {lang?.fees_pg?.download_btn?.title}
              </span>

              <CustomImage
                src='/icons/expand.svg'
                width={14}
                height={14}
                className={` ${
                  isDownloadLoading || !academicYearId
                    ? 'opacity-60'
                    : 'opacity-1'
                }  object-cover rounded-full`}
              />
            </div>
          )}
        </Dropdown>
      </Col>

      <Col>
        <CustomButton onClick={() => setIsVisible(true)} type='primary'>
          {lang?.fees_pg?.new_btn}
        </CustomButton>
      </Col>
    </Row>
  )

  const LeftSide = () => (
    <p className='text-[20px] text-dark font-semibold'>
      {fees?.payload?.totalItems || ''} {lang?.fees_pg?.title}
    </p>
  )

  const FiltersDropdown = (
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
        onChange={handleClassChange}
        value={classroomId}
        type='small-select'
        label={lang?.dashboard_shared?.filters?.class?.name}
        options={[
          {
            key: 0,
            value: '',
            label: lang?.dashboard_shared?.filters?.class?.sub_title,
          },
          ...classesList,
        ]}
        isLoading={isClassLoading}
      />

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

      <CustomInput
        onChange={handleFeeTypeChange}
        value={feeType}
        type='small-select'
        label={lang?.dashboard_shared?.filters?.type?.name}
        options={[
          {
            key: 0,
            value: '',
            label: lang?.dashboard_shared?.filters?.type?.sub_title,
          },
          { key: 1, value: 'SCHOOL_FEE', label: 'School fee' },
          {
            key: 2,
            value: 'ADDITIONAL_FEE',
            label: 'Additional fee',
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
        loading={isAddingFee || isEditingFee}
        handleCancel={handleCancelEditModal}
        width={550}
        title={
          itemToEdit
            ? lang?.fees_pg?.modals?.edit_fee_title
            : lang?.fees_pg?.modals?.add_fee_title
        }
        footerContent={
          <CustomButton
            loading={isAddingFee || isEditingFee}
            type='primary'
            htmlType='submit'
            form='add-class'
          >
            {lang?.dashboard_shared?.buttons?.save}
          </CustomButton>
        }
      >
        <NewFeeForm
          form={form}
          onFinish={onAddFeeFinish}
          isPaymentOPtional={isPaymentOPtional}
          setIsPaymentOPtional={setIsPaymentOPtional}
          isPaymentAdditional={isPaymentAdditional}
          setIsPaymentAdditional={setIsPaymentAdditional}
          classes={classes}
          academicYears={academicYears}
          itemToEdit={itemToEdit}
          isScreenSmall={isScreenSmall}
        />
      </CustomModal>

      <CustomModal
        isVisible={classroomPdf}
        setIsVisible={setClassrooPdf}
        loading={isDownload}
        handleCancel={handleCancel}
        width={900}
        title={'Fees clearence'}
        footerContent={
          <CustomButton type='primary' htmlType='button'  onClick={()=>handleDownloadPDF()} >
            {'Download'}
          </CustomButton>
        }
      >
        <div ref={ref}>
          <div className='w-full'>
            <div className='flex flex-row items-center border-b-2'>
              <div className=''>
                <CustomImage
                  src='/icons/logo.png'
                  className='mb-12'
                  width={200}
                />
              </div>
              <div>
                <p className='font-bold text-xl'>NEST INTERNATIONAL ACADEMY</p>
                <p className=' font-semibold pl-5 italic'>
                  Kigali City, Gasabo District, Kimironko Sector
                </p>
                <p className=' font-semibold pl-[60px] italic'>
                  Email: info@schoolnest.ac.rw
                </p>
                <p className=' font-semibold pl-[70px] italic'>
                  Phone: +(250) 788 927 033
                </p>
              </div>
            </div>

            <p className=' font-bold  mt-4 mb-5 text-dark text-base text-center'>
              {termId} SCHOOL FEES CLEARANCE REPORT FOR ALL CLASSES
            </p>
            {isDownload && <GeneralContentLoader />}
            {classPdf?.length > 1 && (
              <div>
                <div className='mb-5 flex justify-between items-center font-semibold border-b-2 p-2'>
                  <div className='w-1/4 '>ID</div>
                  <div className='w-1/4 '>CLASS</div>
                  <div className='w-1/4'>FEES/STUDENT</div>
                  <div className='w-1/4 '>PAID AMOUNT</div>
                  <div className='w-1/4 '>BALANCE</div>
                </div>
                {classPdf?.map((obj, idx) => {
                  return (
                    <div
                      key={idx}
                      className='mb-5 flex justify-between items-center'
                    >
                      <div className='w-1/4 '>
                        <p>{idx + 1}</p>
                      </div>
                      <div className='w-1/4 '>
                        <p>{obj?.streamName}</p>
                      </div>
                      <div className='w-1/4'>
                        <p>{obj?.feesPerStudent}</p>
                      </div>
                      <div className='w-1/4 '>
                        <p>{obj?.paidAmount}</p>
                      </div>
                      <div className='w-1/4'>
                        <p>{Math.abs(obj?.remainingBalance)}</p>
                      </div>
                    </div>
                  )
                })}
                <div className='mb-5 flex justify-between items-center'>
                  <div className='w-1/4 font-bold'>Total</div>
                  <div className='w-1/4'></div>
                  <div className='w-1/4'></div>
                  <div className='w-1/4 font-bold'>
                    {total?.totalPaidAmount}
                  </div>
                  <div className='w-1/4 font-bold'>
                    {Math.abs(total?.totalRemainingBalance)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CustomModal>

      <ContentNavbar left={<LeftSide />} right={<RightSide />} />

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

                  <Col>
                    <CustomInput
                      onChange={handleFeeTypeChange}
                      value={feeType}
                      type='small-select'
                      label={lang?.dashboard_shared?.filters?.type?.name}
                      options={[
                        {
                          key: 0,
                          value: '',
                          label:
                            lang?.dashboard_shared?.filters?.type?.sub_title,
                        },
                        { key: 1, value: 'SCHOOL_FEE', label: 'School fee' },
                        {
                          key: 2,
                          value: 'ADDITIONAL_FEE',
                          label: 'Additional fee',
                        },
                      ]}
                    />
                  </Col>
                </Row>
              )}
            </Col>
          </Row>

          <div
            style={{ maxHeight: 'calc(100vh - 310px)' }}
            className='mt-5 h-[fit-content] overflow-x-auto'
          >
            {showEmpty ? (
              <Empty className='mt-6 h-[62vh]' />
            ) : (
              <FeesTable
                fees={fees}
                isFetching={isFetching}
                setItemToEdit={setItemToEdit}
                setIsVisible={setIsVisible}
                lang={lang}
                isScreenSmall={isScreenSmall}
              />
            )}

            <Paginator
              total={fees?.payload?.totalItems}
              setCurrentPage={setCurrentPage}
              totalPages={fees?.payload?.totalPages}
              classes={classes}
            />
          </div>
        </ContentTableContainer>
      )}
    </>
  )
}

export default Private(Students)
