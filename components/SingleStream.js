import React, { useEffect, useState, useRef } from 'react'
import Form from 'antd/lib/form'
import PropTypes from 'prop-types'
import CustomButton from './Shared/CustomButton'
import CustomInput from './Shared/CustomInput'
import CustomModal from './Shared/CustomModal'
import WarningModal from './Shared/WarningModal'
import CustomImage from './Shared/CustomImage'
import {
  useDeleteStreamMutation,
  useEditStreamMutation,
  useDownloadStreamMutation,
  useClassListQuery,
} from '../lib/api/Classrooms/classroomsEndpoints'
import requiredField from '../helpers/requiredField'
import handleAPIRequests from '../helpers/handleAPIRequests'
import handleDownloadFile from '../helpers/handleDownloadFile'


import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'

const SingleStream = ({ data, index, visibleClass, lang, academicYear }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isWarningVisible, setIsWarningVisible] = useState(false)
  const [ispdf, setIsPfdf] = useState(false)

  const [form] = Form.useForm()

  const [editStream, { isLoading: isEditing }] = useEditStreamMutation()
  const [deleteStream, { isLoading: isDeleting }] = useDeleteStreamMutation()

  const onSuccess = () => {
    setIsVisible(false)
  }

  const { data: classList, isFetching: isClassLoading } = useClassListQuery({
    academicYearId: academicYear,
    id: data?.id,
  })

  const ref = useRef()

  const [downloadStream, { isLoading: isDownloadLoading }] =
    useDownloadStreamMutation()

  const onEditStreamFinish = (values) => {
    handleAPIRequests({
      request: editStream,
      id: visibleClass?.id,
      streamId: data?.id,
      notify: true,
      message: lang?.alert_messages?.success?.edit_stream,
      onSuccess: onSuccess,
      ...values,
    })
  }

  const onDownloadSuccess = async (file) => {
    handleDownloadFile({ name: 'class-List', file })
  }

  const handleDownloadPDF = async () => {
    const image = await toPng(ref.current)
    const pdf = new jsPDF()
    pdf.addImage(image, 'PNG', 10, 10, 190, 0)
    pdf.save(`${data?.name} class list`)
  }

  const handleDownload = () => {
    handleAPIRequests({
      request: downloadStream,
      id: data?.id,
      academicYearId: academicYear,
      onSuccess: onDownloadSuccess,
    })
  }

  useEffect(() => {
    form.setFieldsValue({
      name: data?.name,
    })
  }, [data?.name, form])

  const handleDelete = () => {
    setIsWarningVisible(true)
  }

  return (
    <>
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        loading={isEditing}
        title={lang?.classrooms_pg?.modals?.edit_stream_title}
        footerContent={
          <CustomButton
            loading={isEditing}
            type='primary'
            htmlType='submit'
            form='edit-stream'
          >
            {lang?.dashboard_shared?.buttons?.save}
          </CustomButton>
        }
        subTitle={lang?.classrooms_pg?.modals?.add_stream_sub_title}
        subTitleKey={visibleClass?.name}
      >
        <Form form={form} name='edit-stream' onFinish={onEditStreamFinish}>
          <CustomInput
            label={lang?.classrooms_pg?.modals?.stream_name}
            name='name'
            placeholder={`${lang?.classrooms_pg?.modals?.stream_name}...`}
            rules={requiredField('Stream name')}
          />
        </Form>
      </CustomModal>

      <CustomModal
        isVisible={ispdf}
        setIsVisible={setIsPfdf}
        loading={isEditing}
        title={'Class list'}
        width={800}
        footerContent={
          <div>
            <CustomButton type='primary' onClick={handleDownloadPDF}>
              Download
            </CustomButton>
          </div>
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
              <span className='text-black'>CLASS LIST FOR : </span>{' '}
              {classList?.payload?.name}
            </p>
            {classList?.payload?.studentPromotions?.length > 1 && (
              <div>
                <div className='mb-5 flex justify-between items-center font-semibold border-b-2'>
                  <div className='w-1/4 '>ID</div>
                  <div className='w-1/4 '>Student</div>
                  <div className='w-1/4'>Identifier</div>
                </div>
                {classList?.payload?.studentPromotions?.map((obj, idx) => {
                  return (
                    <div
                      key={idx}
                      className='mb-5 flex justify-between items-center'
                    >
                      <div className='w-1/4 '>
                        <p>{idx + 1}</p>
                      </div>
                      <div className='w-1/4 '>
                        <p>{obj?.student?.fullName}</p>
                      </div>
                      <div className='w-1/4'>
                        <p>{obj?.student?.studentIdentifier}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </CustomModal>

      <WarningModal
        isVisible={isWarningVisible}
        setIsVisible={setIsWarningVisible}
        warningMessage='Do you really want to delete stream'
        warningKey={data?.name}
        itemToDelete={visibleClass?.id}
        request={deleteStream}
        loading={isDeleting}
        streamId={data?.id}
        message={lang?.alert_messages?.success?.delete_stream}
      />

      <div className='flex bg-white shadow-sm p-4 items-center rounded-sm mb-4 justify-between'>
        <div className='flex gap-4'>
          <p className='text-semi_grey'>{index}.</p>
          <p className='text-dark'>{data.name}</p>
        </div>
        <div className='flex gap-4'>
          <CustomButton type='edit' onClick={() => setIsPfdf(true)}>
            {lang?.dashboard_shared?.buttons?.download_pdf}
          </CustomButton>
          <CustomButton
            type='edit'
            loading={isDownloadLoading}
            onClick={handleDownload}
          >
            {lang?.dashboard_shared?.buttons?.download_exl}
          </CustomButton>
          <CustomButton type='edit' onClick={() => setIsVisible(true)}>
            {lang?.dashboard_shared?.buttons?.edit}
          </CustomButton>

          <CustomButton type='delete' onClick={handleDelete}>
            {lang?.dashboard_shared?.buttons?.delete}
          </CustomButton>
        </div>
      </div>
    </>
  )
}

SingleStream.propTypes = {
  data: PropTypes.any,
  index: PropTypes.number,
  visibleClass: PropTypes.string,
}

export default SingleStream
