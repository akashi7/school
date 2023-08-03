import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'antd/lib/form'
import CustomImage from '../../../components/Shared/CustomImage'
import SingleStream from '../../../components/SingleStream'
import CustomButton from '../../../components/Shared/CustomButton'
import CustomInput from '../../../components/Shared/CustomInput'
import CustomModal from '../../../components/Shared/CustomModal'
import {
  useAddStreamMutation,
  useLazyGetStreamsQuery,
  useClassListQuery,
} from '../../../lib/api/Classrooms/classroomsEndpoints'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import {
  AppLoader,
  GeneralContentLoader,
} from '../../../components/Shared/Loaders'
import requiredField from '../../../helpers/requiredField'
import { Empty } from '../../../components/Shared/Empty'
import { useGetAcademicYearsQuery } from '../../../lib/api/AcademicYear/academicYearEndpoints'

const ClassProfile = ({
  visibleClass,
  setVisibleClass,
  lang,
  showClassProfile,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const [academicYearId, setAcademicYearId] = useState('')

  const [getStreams, { isFetching, isLoading, data: streams }] =
    useLazyGetStreamsQuery()
  const [addStream, { isLoading: isAddingStream }] = useAddStreamMutation()

  const { data: academicYears, isFetching: isAcademicYearsLoading } =
    useGetAcademicYearsQuery({})

  

  const [form] = Form.useForm()

  const onSuccess = () => {
    form.resetFields()
    setIsVisible(false)
  }


  const handleAcademicYearChange = (value) => {
    setAcademicYearId(value)
  }

  const academicYearsList = academicYears?.payload?.totalItems
    ? [
        ...academicYears?.payload?.items?.map((item) => ({
          key: item?.name,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  const onAddStreamFinish = (values) => {
    handleAPIRequests({
      request: addStream,
      notify: true,
      id: visibleClass?.id,
      message: lang?.alert_messages?.success?.add_stream,
      onSuccess: onSuccess,
      ...values,
    })
  }

  useEffect(() => {
    if (visibleClass?.id) {
      handleAPIRequests({
        request: getStreams,
        id: visibleClass?.id,
      })
    }
  }, [getStreams, visibleClass])

  return (
    <>
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        loading={isAddingStream}
        title={lang?.classrooms_pg?.modals?.add_stream_title}
        footerContent={
          <CustomButton
            type='primary'
            htmlType='submit'
            form='add-stream'
            loading={isAddingStream}
          >
            Save
          </CustomButton>
        }
        subTitle={lang?.classrooms_pg?.modals?.add_stream_sub_title}
        subTitleKey={visibleClass?.name}
      >
        <Form form={form} name='add-stream' onFinish={onAddStreamFinish}>
          <CustomInput
            label='Stream name'
            placeholder='Stream name...'
            name='name'
            rules={requiredField('Stream name')}
          />
        </Form>
      </CustomModal>

      <div className='w-[100%] bg-white p-4 lg:p-8 lg:py-4 rounded-md'>
        {!visibleClass ? (
          <Empty
            message={
              lang.dashboard_shared?.messages?.select_class_to_view_streams
            }
            className='mt-6'
            height='73vh'
          />
        ) : isLoading ? (
          <GeneralContentLoader />
        ) : (
          <>
            <div className='flex gap-4 items-center mb-6 border-b pb-3 px-2'>
              {!showClassProfile && (
                <CustomImage
                  src='/icons/back.svg'
                  className='cursor-pointer bg-gray-500 hover:bg-gray-600 p-[8px] rounded'
                  onClick={() => setVisibleClass(null)}
                />
              )}

              <h1 className='text-dark font-semibold text-[32px]'>
                {visibleClass?.name}
              </h1>
            </div>
            <div className='w-[50%] mb-5'>
              <CustomInput
                onChange={handleAcademicYearChange}
                value={academicYearId}
                type='select'
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
            </div>
            <div className='flex justify-between items-center bg-grey p-4 py-2 rounded-md mb-4'>
              <p className='text-[20px] text-dark font-semibold'>
                {streams?.payload?.totalItems}{' '}
                {lang?.classrooms_pg?.streams?.title}
              </p>

              <CustomImage
                onClick={() => setIsVisible(true)}
                src='/icons/add_stream.svg'
                className='cursor-pointer'
              />
            </div>

            <div
              style={{
                height: showClassProfile
                  ? 'calc(100vh - 420px)'
                  : 'calc(100vh - 400px)',
              }}
              className='overflow-y-auto'
            >
              {isFetching ? (
                <AppLoader height='45vh' className='mt-12' />
              ) : streams?.payload?.totalItems <= 0 ? (
                <Empty className='mt-12' height='45vh' />
              ) : (
                streams?.payload?.items?.map((stream, index) => (
                  <SingleStream
                    key={stream.id}
                    data={stream}
                    academicYear={academicYearId}
                    index={index + 1}
                    visibleClass={visibleClass}
                    lang={lang}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

ClassProfile.propTypes = {
  visibleClass: PropTypes.any,
  setVisibleClass: PropTypes.func,
  showClassProfile: PropTypes.bool,
}

export default ClassProfile
