import Col from 'antd/lib/col'
import Dropdown from 'antd/lib/dropdown'
import moment from 'moment'
import Row from 'antd/lib/row'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChidrenProfile from '../../../components/ChildrenProfile'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import CustomImage from '../../../components/Shared/CustomImage'
import CustomInput from '../../../components/Shared/CustomInput'
import { Empty } from '../../../components/Shared/Empty'
import { AppLoader } from '../../../components/Shared/Loaders'
import Paginator from '../../../components/Shared/Paginator'
import PaymentHistoryTable from '../../../components/Tables/PaymentsTable'
import { _pagination_number_, termOptions } from '../../../config/constants'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import { useWindowSize } from '../../../helpers/useWindowSize'
import { isTokenValid } from '../../../helpers/verifyToken'
import { useGetAcademicYearsQuery } from '../../../lib/api/AcademicYear/academicYearEndpoints'
import { useGetChildrenQuery } from '../../../lib/api/Parent/childrenEndpoints'
import {
  useLazyGetSingleStudentQuery,
  usePaymentHistoryQuery,
} from '../../../lib/api/Students/studentsEndpoints'
import CustomButton from '../../../components/Shared/CustomButton'
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from '@react-pdf/renderer'
import { saveAs } from 'file-saver'

Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: '/fonts/Poppins/Poppins-ExtraLightItalic.ttf',
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
    { src: '/fonts/Poppins/Poppins-Bold.ttf', fontWeight: 'bold' },
    {
      src: '/fonts/Poppins/Poppins-Regular.ttf',
      fontWeight: 'light',
    },
  ],
})

const ParentPaymentHistory = () => {
  const [id, setId] = useState('')
  const handleIsSelected = (Id) => {
    setId(Id)
  }

  const [size, setSize] = useState(10)

  const [academicYearId, setAcademicYearId] = useState('')
  const [academicTerm, setAcademicTerm] = useState('TERM1')
  const [Country, setCountry] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const { id: Id, role, country } = isTokenValid('')

  const { data: children, isLoading, isFetching } = useGetChildrenQuery()

  const isPageLoading = isLoading

  const lang = useSelector((state) => state?.translation?.payload)

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const { data: academicYears, isFetching: isAcademicYearsLoading } =
    useGetAcademicYearsQuery({})

  const { data: studentPayments, isFetching: isStudentsPaymentFetching } =
    usePaymentHistoryQuery({
      id,
      academicTerm,
      academicYearId,
      page: currentPage,
      size: size,
      from,
      to,
    })

  const academicYearsList = academicYears?.payload?.totalItems
    ? [
        ...academicYears?.payload?.items?.map((item) => ({
          key: item?.name,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  const handleAcademicYearChange = (value) => {
    setAcademicYearId(value)
  }

  const [
    getSingleStudent,
    {
      data: StudentProfile,
      isLoading: isStudentLoading,
      isFetching: isStudentFecthing,
    },
  ] = useLazyGetSingleStudentQuery()

  useEffect(() => {
    handleAPIRequests({
      request: getSingleStudent,
      id,
    })
  }, [getSingleStudent, id])

  const handleTermChange = (term) => {
    setAcademicTerm(term)
  }

  const handleFrom = (from) => {
    setFrom(from)
    setCurrentPage(0)
  }
  const handleTo = (to) => {
    setTo(to)
    setCurrentPage(0)
  }

  const [downloadPending, setDownloadPending] = useState(false)

  const TableNavLeftSide = () => (
    <Row align='middle' gutter={20}>
      <Col>
        <p className='text-[20px] text-dark font-semibold'>
          {lang?.students_pg?.profile?.paymentTable?.title}
        </p>
      </Col>
    </Row>
  )

  useEffect(() => {
    if (downloadPending && studentPayments && !isStudentsPaymentFetching) {
      handleDownloadPDF()
    }
    //eslint-disable-next-line
  }, [downloadPending, studentPayments, isStudentsPaymentFetching])

  const TableNavRightSide = () =>
    isScreenSmall ? (
      <Dropdown overlay={FiltersDropdown} trigger={['click']}>
        <div className='p-2 bg-gray-200 pointer rounded h-[40px] w-[42px] flex items-center'>
          <CustomImage src='/icons/filter_icon.svg' className='w-full' />
        </div>
      </Dropdown>
    ) : (
      <>
        <Row align='middle' gutter={24}>
          <Col>
            <CustomInput
              label={'from'}
              type='small-date'
              onChange={handleFrom}
              value={from}
            />
          </Col>
          <Col>
            <CustomInput
              label={'to'}
              type='small-date'
              onChange={handleTo}
              value={to}
            />
          </Col>
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
                  label: lang?.dashboard_shared?.filters?.year?.sub_title,
                },
                ...academicYearsList,
              ]}
              isLoading={isAcademicYearsLoading}
            />
          </Col>

          <Col>
            <CustomInput
              type='small-select'
              label={lang?.dashboard_shared?.filters?.term?.name}
              value={academicTerm}
              onChange={handleTermChange}
              options={[
                {
                  key: 1,
                  value: '',
                  label: lang?.dashboard_shared?.filters?.term?.sub_title,
                },
                ...termOptions,
              ]}
            />
          </Col>
        </Row>
      </>
    )

  const FiltersDropdown = () => (
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
        type='small-select'
        label={lang?.dashboard_shared?.filters?.term?.name}
        value={academicTerm}
        onChange={handleTermChange}
        options={[
          {
            key: 1,
            value: '',
            label: lang?.dashboard_shared?.filters?.term?.sub_title,
          },
          ...termOptions,
        ]}
      />
    </div>
  )

  const handleDownloadPDF = async () => {
    try {
      setDownloadPending(true)
      const pdfBlob = await new Promise((resolve) => {
        const pdfDocument = (
          <Document>
            <Page size='A4' style={styles.page}>
              <View style={styles.centeredView}>
                <Text>{studentPayments?.payload?.school?.school?.schoolTitle}</Text>
                <Text style={styles.centerStyle}>
                {studentPayments?.payload?.school?.school?.address}
                </Text>
                <Text style={styles.centerStyle}>
                  Email: {studentPayments?.payload?.school?.email}
                </Text>
                <Text style={styles.centerStyle}>
                {studentPayments?.payload?.school?.phone || ""}
                </Text>
              </View>
              <View style={styles.studentInfoContainer}>
                <View style={styles.studentInfo}>
                  <Text style={{ marginBottom: 3 }}>Student</Text>
                  <Text style={styles.infoValue}>
                    {StudentProfile?.payload?.fullName}
                  </Text>
                  <Text style={styles.infoValue}>
                    {StudentProfile?.payload?.countryName}
                  </Text>
                  <Text style={styles.infoValue}>
                    {StudentProfile?.payload?.address}
                  </Text>
                </View>
                <View style={styles.studentInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Class : </Text>
                    <Text style={styles.infoValue}>
                      {StudentProfile?.payload?.stream?.classroom?.name}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Stream : </Text>
                    <Text style={styles.infoValue}>
                      {StudentProfile?.payload?.stream?.name}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerText}>Date</Text>
                <Text style={styles.headerText}>Description</Text>
                <Text style={styles.headerText}>Term</Text>
                <Text style={styles.headerText}>Year</Text>
                <Text style={styles.headerText}>Amount</Text>
              </View>

              {/* Table Content */}
              {studentPayments?.payload?.result?.items?.map((row) => (
                <View key={row.id} style={styles.row}>
                  <Text style={styles.cell}>
                    {moment(row?.date).format('YYYY-MM-DD')}
                  </Text>
                  <Text style={styles.cell}>{row?.fee?.type}</Text>
                  <Text style={styles.cell}>{row?.academicTerm}</Text>
                  <Text style={styles.cell}>{row?.academicYear?.name}</Text>
                  <Text style={styles.cell}>{row?.amount}</Text>
                </View>
              ))}
            </Page>
          </Document>
        )

        const pdfAsBlob = pdf(pdfDocument).toBlob()
        resolve(pdfAsBlob)
      })
      saveAs(pdfBlob, 'payment-history.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setDownloadPending(false)
    }
  }

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      padding: 20,
      fontFamily: 'Poppins',
      width: '100%',
    },
    centeredView: {
      width: '100%',
      textAlign: 'center',
      marginBottom: 20,
      flexDirection: 'column',
      paddingBottom: 8,
    },
    centerStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    header: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
      paddingBottom: 5,
      marginBottom: 10,
      marginTop: 10,
    },
    headerText: {
      width: '20%',
      fontSize: 14,
      fontWeight: 'bold', // Make headers bold
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#dddddd',
      padding: 10,
    },
    cell: {
      width: '20%',
      fontSize: 10,
      fontWeight: 'bold',
      fontStyle: 'italic', // Make cell content italic
    },
    studentInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
    studentInfo: {
      // marginLeft: 20,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      fontWeight: 'light',
    },
    infoLabel: {
      fontSize: 12,
      fontWeight: 'bold',
      marginRight: 5,
      fontWeight: 'light',
    },
    infoValue: {
      fontSize: 12,
    },
  })

  return (
    <>
      {isLoading ? (
        <AppLoader />
      ) : !children ? (
        <Empty message='The item you are looking for is not available!' />
      ) : (
        <>
          <div className='flex  justify-between items-center'>
            <ChidrenProfile
              handleIsSelected={handleIsSelected}
              isScreenSmall={isScreenSmall}
              data={children?.payload}
              setAcademicYearId={setAcademicYearId}
              setCountry={setCountry}
              lang={lang}
            />
            <div>
              <Col>
                <CustomButton
                  onClick={() => {
                    setSize(50)
                    setDownloadPending(true)
                  }}
                  type='primary'
                  loading={downloadPending}
                >
                  Payment report
                </CustomButton>
              </Col>
            </div>
          </div>

          <ContentTableContainer>
            <ContentNavbar
              left={<TableNavLeftSide />}
              right={<TableNavRightSide />}
            />
            <div
              style={{ maxHeight: isScreenSmall ? '' : 'calc(100vh - 440px)' }}
              className={`mt-5 ${
                !isScreenSmall && 'h-[fit-content] overflow-x-auto'
              }`}
            >
              <PaymentHistoryTable
                data={studentPayments}
                isFetching={isStudentsPaymentFetching}
                lang={lang}
                isScreenSmall={isScreenSmall}
                profile={StudentProfile}
                role={role}
              />
              <Paginator
                total={studentPayments?.payload?.result?.totalItems}
                setCurrentPage={setCurrentPage}
                totalPages={studentPayments?.payload?.result?.totalPages}
              />
            </div>
          </ContentTableContainer>
        </>
      )}
    </>
  )
}

export default Private(ParentPaymentHistory)
