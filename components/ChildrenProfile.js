import React, { useState, useEffect } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import CustomButton from './Shared/CustomButton'
import CustomImage from './Shared/CustomImage'
import { BeingPromotedLoader } from './Shared/Loaders'
import { toLocalString } from '../helpers/numbers'
import userType from '../helpers/userType'
import { isTokenValid } from '../helpers/verifyToken'
import Checkbox from 'antd/lib/checkbox/Checkbox'

const ChidrenProfile = ({
  data,
  isFetching,
  setIsVisible = () => null,
  setIsWarningVisible = () => null,
  setIsPromoteModalVisible = () => null,
  handleIsSelected,
  isScreenSmall,
  setAcademicYearId,
  setCountry,
  lang,
}) => {
  // const { role } = isTokenValid();

  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    // Select the first student by default if there is only one item
    if (data && data.length === 1) {
      setSelectedStudent(data[0]?.id)
      handleIsSelected(data[0]?.id)
      setAcademicYearId(data[0]?.academicYearId)
      setCountry(data[0]?.countryName)
    }
  }, [data])

  const handleCheckboxChange = (studentId, academicYearId, country) => {
    setSelectedStudent(studentId)
    handleIsSelected(studentId)
    setAcademicYearId(academicYearId)
    setCountry(country)
  }

  return (
    <div className='bg-white p-6 relative'>
      <p className='text-[20px] text-dark font-semibold'>
        {data?.length || ''} {lang?.children_pg?.title}
      </p>
      <Row gutter={24} className='mt-6'>
        {data?.map((student) => {
          return (
            <div key={student?.id}>
              <Checkbox
                name='select'
                checked={selectedStudent === student?.id}
                onChange={() =>
                  handleCheckboxChange(
                    student?.id,
                    student?.academicYearId,
                    student?.countryName
                  )
                }
              >
                {student?.fullName}
              </Checkbox>
            </div>
          )
        })}
      </Row>
    </div>
  )
}

export default ChidrenProfile
