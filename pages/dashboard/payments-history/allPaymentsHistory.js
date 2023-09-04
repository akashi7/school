import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Private from '../../../components/Routes/Private'
import ContentNavbar from '../../../components/Shared/ContentNavbar'
import ContentTableContainer from '../../../components/Shared/ContentTableContainer'
import CustomInput from '../../../components/Shared/CustomInput'
import { LoadingOutlined } from '@ant-design/icons'
import CustomButton from '../../../components/Shared/CustomButton'
import moment from 'moment'
import {
  AppLoader,
  GeneralContentLoader,
} from '../../../components/Shared/Loaders'
import Paginator from '../../../components/Shared/Paginator'
import AllPaymentsTable from '../../../components/Tables/allPaymentsTable'
import { _pagination_number_, termOptions } from '../../../config/constants'
import { useWindowSize } from '../../../helpers/useWindowSize'
import { useGetAcademicYearsQuery } from '../../../lib/api/AcademicYear/academicYearEndpoints'
import {
  useGetAllAdminsPaymentsQuery,
  useGetOnePaymentDetailsQuery,
  useDownloadPaymentDetailsMutation,
} from '../../../lib/api/payments/paymentsEndpoints'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import handleDownloadFile from '../../../helpers/handleDownloadFile'
import {
  useLazyGetSingleStudentQuery,
  usePaymentHistoryQuery,
} from '../../../lib/api/Students/studentsEndpoints'
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

const AllPaymentsHistory = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [termId, setTermId] = useState('')
  const [academicYearId, setAcademicYearId] = useState('')
  const [studentIdentifier, setStudentIdentifier] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [id, setId] = useState('')
  const [downloadPending, setDownloadPending] = useState(false)
  const [size, setSize] = useState(10)

  const {
    data: payments,
    isLoading,
    isFetching,
  } = useGetAllAdminsPaymentsQuery({
    page: currentPage,
    size: _pagination_number_,
    academicYearId,
    academicTerm: termId,
    studentIdentifier,
    from,
    to,
  })

  const { data: academicYears, isFetching: isAcademicYearsLoading } =
    useGetAcademicYearsQuery({})

  const { data: studentPayments, isFetching: isStudentsPaymentFetching } =
    usePaymentHistoryQuery({
      id,
      academicTerm: termId,
      academicYearId,
      page: currentPage,
      size: size,
      from,
      to,
    })

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

  const isPageLoading = isLoading

  const lang = useSelector((state) => state?.translation?.payload)

  const [downloadPaymentDetails, { isLoading: isDownloadLoading }] =
    useDownloadPaymentDetailsMutation()

  const handleDownloadReportSuccess = (file) => {
    handleDownloadFile({ name: 'Payroll-Report', file })
  }

  const handleDownloadPayrollReport = () => {
    handleAPIRequests({
      request: downloadPaymentDetails,
      id,
      academicYearId,
      academicTerm: termId,
      from,
      to,
      onSuccess: handleDownloadReportSuccess,
      notify: true,
    })
  }

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const academicYearsList = academicYears?.payload?.totalItems
    ? [
        ...academicYears?.payload?.items?.map((item) => ({
          key: item?.name,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  const LeftSide = () => (
    <p className='text-[20px] text-dark font-semibold'>
      {payments?.payload?.totalItems || ''} {'payments'}
    </p>
  )

  const RightSide = () => {
    return (
      id &&
      academicYearId &&
      termId && (
        <Row gutter={24} align='middle'>
          <Col>
            <div
              onClick={() => handleDownloadPayrollReport()}
              className='p-2 w-[100%] bg-gray-200 rounded shadow-sm '
            >
              {isDownloadLoading && (
                <LoadingOutlined style={{ fontSize: 16 }} spin />
              )}
              <span
                className={`${
                  isDownloadLoading ? 'opacity-60' : 'opacity-1'
                }  text-[14px] font-medium cursor-pointer p-3`}
              >
                {'Download Excel'}
              </span>
            </div>
          </Col>
          <Col>
            <CustomButton
              onClick={() => {
                setSize(50)
                setDownloadPending(true)
              }}
              type='primary'
              loading={downloadPending}
            >
              Download pdf
            </CustomButton>
          </Col>
        </Row>
      )
    )
  }

  useEffect(() => {
    if (!isFetching) {
      if (payments && studentIdentifier) {
        setId(payments?.payload?.items[0]?.student?.id)
      }
      if (!studentIdentifier) {
        setId('')
      }
    }
  }, [payments, isFetching, studentIdentifier])

  const handleAcademicYearChange = (value) => {
    setAcademicYearId(value)
  }

  const handleTermChange = (value) => {
    setTermId(value)
  }

  const onSearchChange = (value) => {
    setStudentIdentifier(value)
    setCurrentPage(0)
  }

  const handleFrom = (from) => {
    setFrom(from)
    setCurrentPage(0)
  }
  const handleTo = (to) => {
    setTo(to)
    setCurrentPage(0)
  }

  const handleDownloadPDF = async () => {
    try {
      setDownloadPending(true)
      const pdfBlob = await new Promise((resolve) => {
        const pdfDocument = (
          <Document>
            <Page size='A4' style={styles.page}>
              <View style={styles.centeredView}>
                <Text>
                  {studentPayments?.payload?.school?.school?.schoolTitle}
                </Text>
                <Text style={styles.centerStyle}>
                  {studentPayments?.payload?.school?.school?.address}
                </Text>
                <Text style={styles.centerStyle}>
                  Email: {studentPayments?.payload?.school?.email}
                </Text>
                <Text style={styles.centerStyle}>
                  {studentPayments?.payload?.school?.phone || ''}
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
      setDownloadPending(false)
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

  useEffect(() => {
    if (downloadPending && studentPayments && !isStudentsPaymentFetching) {
      handleDownloadPDF()
    }
    //eslint-disable-next-line
  }, [downloadPending, studentPayments, isStudentsPaymentFetching])

  return (
    <>
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
                </Col>
              </Row>
            </Col>
          </Row>
          <div
            style={{
              maxHeight: isScreenSmall ? '' : 'calc(100vh - 440px)',
            }}
            className={`mt-5 ${
              !isScreenSmall && 'h-[fit-content] overflow-x-auto'
            }`}
          >
            <AllPaymentsTable
              payments={payments}
              lang={lang}
              isFetching={isFetching}
            />
          </div>
          <Paginator
            total={payments?.payload?.totalItems}
            setCurrentPage={setCurrentPage}
            totalPages={payments?.payload?.totalPages}
          />
        </ContentTableContainer>
      )}
    </>
  )
}

export default Private(AllPaymentsHistory)
