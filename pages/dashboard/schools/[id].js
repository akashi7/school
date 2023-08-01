import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Private from '../../../components/Routes/Private'
import SchoolProfile from '../../../components/SchoolProfile'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import { Empty } from '../../../components/Shared/Empty'
import { AppLoader } from '../../../components/Shared/Loaders'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import { useWindowSize } from '../../../helpers/useWindowSize'
import { useLazyGetOneSchoolQuery } from '../../../lib/api/Schools/schoolsEndpoints'
import Layout from '../../../components/Layout'

const SingleSchool = () => {
  const router = useRouter()
  const { id } = router.query

  const lang = useSelector((state) => state?.translation?.payload)

  const [getOneSchool, { data, isLoading, isFetching }] =
    useLazyGetOneSchoolQuery()

  useEffect(() => {
    handleAPIRequests({
      request: getOneSchool,
      id,
    })
  }, [getOneSchool, id])

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const TableNavLeftSide = () => (
    <Row align='middle' gutter={20}>
      <Col>
        <p className='text-[20px] text-dark font-semibold'>
          {/* {lang?.students_pg?.profile?.table?.title} */} School Info
        </p>
      </Col>
    </Row>
  )

  return (
    <Layout>
      {isLoading ? (
        <AppLoader />
      ) : !data ? (
        <Empty message='The item you are looking for is not available!' />
      ) : (
        <>
          <SchoolProfile
            data={data}
            isFetching={isFetching}
            setIsVisible={() => null}
            setIsWarningVisible={() => null}
            setIsPromoteModalVisible={() => null}
            lang={lang}
            isScreenSmall={isScreenSmall}
            showAmount={false}
          />

          <ContentTableContainer>
            <ContentNavbar
              left={<TableNavLeftSide />}
              // right={<TableNavRightSide />}
            />

            <div
              style={{ maxHeight: isScreenSmall ? '' : 'calc(100vh - 440px)' }}
              className={`mt-5 ${
                !isScreenSmall && 'h-[fit-content] overflow-x-auto'
              }`}
            >
              <div className='w-[50%] '>
                <div className='flex justify-between mt-5'>
                  <p className='text-dark'>
                    {lang?.schools_pg?.modals?.school_name}
                  </p>
                  <p className='text-gray-400 '>{data?.payload?.schoolName}</p>
                </div>
                <div className='flex justify-between mt-5'>
                  <p className='text-dark'>
                    {lang?.schools_pg?.modals?.school_address}
                  </p>
                  <p className='text-gray-400 '>{data?.payload?.address}</p>
                </div>

                <div className='flex justify-between mt-5'>
                  <p className='text-dark'>Registered</p>
                  <p className='text-gray-400 '>
                    {moment(data?.payload?.createdAt).format('YYYY-MM-DD')}
                  </p>
                </div>
                <div className='flex justify-between mt-5'>
                  <p className='text-dark'>
                    {lang?.schools_pg?.modals?.school_type}
                  </p>
                  <p className='text-gray-400 '>{data?.payload?.schoolType}</p>
                </div>
              </div>
            </div>
          </ContentTableContainer>
        </>
      )}
    </Layout>
  )
}

export default Private(SingleSchool)
