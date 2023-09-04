import Form from 'antd/lib/form'
import React, { useState } from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import { useSelector } from 'react-redux'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import CustomButton from '../../../components/Shared/CustomButton'
import CustomModal from '../../../components/Shared/CustomModal'
import {
  AppLoader,
  GeneralContentLoader,
} from '../../../components/Shared/Loaders'
import Paginator from '../../../components/Shared/Paginator'
import { _pagination_number_ } from '../../../config/constants'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import { useWindowSize } from '../../../helpers/useWindowSize'

import NewMessageForm from '../../../components/Forms/NewMessage'
import MessagesTable from '../../../components/Tables/MessagesTable'
import {
  useAddMessageMutation,
  useGetMessagesQuery,
} from '../../../lib/api/messages/messagesEndpoints'
import NewSingleMessage from '../../../components/Forms/NewSingleMessage'

const Messages = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const[singleMessage,setSingleMessage]=useState(false)

  const {
    data: messages,
    isLoading,
    isFetching,
  } = useGetMessagesQuery({
    page: currentPage,
    size: _pagination_number_,
  })

  const lang = useSelector((state) => state?.translation?.payload)

  const [form] = Form.useForm()

  //addMessage

  const [addMessage, { isLoading: isAddingPosition }] = useAddMessageMutation()

  const onSuccess = () => {
    setIsVisible(false)
    setCurrentPage(0)
    setSingleMessage(false)
    form.resetFields()
  }

  const handleCancel = () => {
    setIsVisible(false)
    form.resetFields()
  }

  const onAddPositionFinish = (values) => {
    const data = {
      ...values,
    }

    handleAPIRequests({
      request: addMessage,
      onSuccess: onSuccess,
      notify: true,
      // id: itemToEdit?.id,
      message: 'Message sent',
      ...data,
    })
  }

  const isPageLoading = isLoading

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const RightSide = () => (
    <Row gutter={24} align='middle'>
      <Col>
        <CustomButton onClick={() => setIsVisible(true)} type='primary'>
          {lang?.message_pg?.new_btn}
        </CustomButton>
      </Col>
      <Col>
        <CustomButton onClick={() => setSingleMessage(true)} type='primary'>
          {lang?.message_pg?.new_btn_new_btn}
        </CustomButton>
      </Col>
    </Row>
  )

  const LeftSide = () => (
    <p className='text-[20px] text-dark font-semibold'>
      {messages?.payload?.totalItems || ''} {lang?.message_pg?.title}
    </p>
  )

  return (
    <>
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        loading={isAddingPosition}
        width={700}
        handleCancel={handleCancel}
        title={'New Message'}
        footerContent={
          <CustomButton
            loading={isAddingPosition}
            type='primary'
            htmlType='submit'
            form='add-message'
          >
            {lang?.dashboard_shared?.buttons?.save}
          </CustomButton>
        }
      >
        <NewMessageForm
          form={form}
          onFinish={onAddPositionFinish}
          lang={lang}
        />
      </CustomModal>
      <CustomModal
        isVisible={singleMessage}
        setIsVisible={setSingleMessage}
        loading={isAddingPosition}
        width={700}
        handleCancel={handleCancel}
        title={'New Single Message'}
        footerContent={
          <CustomButton
            loading={isAddingPosition}
            type='primary'
            htmlType='submit'
            form='add-single-message'
          >
            {lang?.dashboard_shared?.buttons?.save}
          </CustomButton>
        }
      >
        <NewSingleMessage
          form={form}
          onFinish={onAddPositionFinish}
          lang={lang}
        />
      </CustomModal>

      <ContentNavbar left={<LeftSide />} right={<RightSide />} />
      {isPageLoading ? (
        <GeneralContentLoader />
      ) : (
        <ContentTableContainer>
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
              <MessagesTable
                messages={messages}
                lang={lang}
                isFetching={isFetching}
              />
            )}

            <Paginator
              total={messages?.payload?.totalItems}
              setCurrentPage={setCurrentPage}
              totalPages={messages?.payload?.totalPages}
            />
          </div>
        </ContentTableContainer>
      )}
    </>
  )
}

export default Private(Messages)
