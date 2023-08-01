import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NewPositionForm from '../../../components/Forms/NewPosition'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import CustomButton from '../../../components/Shared/CustomButton'
import CustomInput from '../../../components/Shared/CustomInput'
import CustomModal from '../../../components/Shared/CustomModal'
import {
  AppLoader,
  GeneralContentLoader,
} from '../../../components/Shared/Loaders'
import Paginator from '../../../components/Shared/Paginator'
import PositionTable from '../../../components/Tables/PositionsTable'
import { _pagination_number_ } from '../../../config/constants'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import { useWindowSize } from '../../../helpers/useWindowSize'
import {
  useAddPositionMutation,
  useGetPositionsQuery,
} from '../../../lib/api/positions/positionEndpoints'

const Position = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')

  const {
    data: positions,
    isLoading,
    isFetching,
  } = useGetPositionsQuery({
    page: currentPage,
    size: _pagination_number_,
    search,
  })

  const lang = useSelector((state) => state?.translation?.payload)

  const [form] = Form.useForm()

  const [addPosition, { isLoading: isAddingPosition }] =
    useAddPositionMutation()

  const onSuccess = () => {
    setIsVisible(false)
    setCurrentPage(0)
    setSearch('')
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

  const onAddPositionFinish = (values) => {
    const data = {
      ...values,
    }

    handleAPIRequests({
      request: addPosition,
      onSuccess: onSuccess,
      notify: true,
      // id: itemToEdit?.id,
      message: 'position added',
      ...data,
    })
  }

  const isPageLoading = isLoading

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024


  const RightSide = () => (
    <CustomButton onClick={() => setIsVisible(true)} type='primary'>
      {lang?.position_pg?.new_btn}
    </CustomButton>
  )

  const LeftSide = () => (
    <p className='text-[20px] text-dark font-semibold'>
      {positions?.payload?.totalItems || ''} {lang?.position_pg?.title}
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
        title={'add Position'}
        footerContent={
          <CustomButton
            loading={isAddingPosition}
            type='primary'
            htmlType='submit'
            form='add-position'
          >
            {lang?.dashboard_shared?.buttons?.save}
          </CustomButton>
        }
      >
        <NewPositionForm form={form} onFinish={onAddPositionFinish} />
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
              <PositionTable
                positions={positions}
                lang={lang}
                isFetching={isFetching}
              />
            )}

            <Paginator
              total={positions?.payload?.totalItems}
              setCurrentPage={setCurrentPage}
              totalPages={positions?.payload?.totalPages}
            />
          </div>
        </ContentTableContainer>
      )}
    </>
  )
}

export default Private(Position)
