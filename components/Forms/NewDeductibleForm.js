import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import Select from 'antd/lib/select'
import React from 'react'
import { useSelector } from 'react-redux'
import { useGetDeductibleTypesQuery } from '../../lib/api/deductibletypes/DeductibleTypesEndpoints'
import CustomInput from '../Shared/CustomInput'


const { Option } = Select

const NewDeductibleForm = ({
  onFinish,
  form,
  isPaymentOPtional,
  setIsPaymentOPtional,
  isPaymentAdditional,
  setIsPaymentAdditional,
  classes,
  academicYears,
  itemToEdit,
  isScreenSmall,
  setTypeId,
  typeId
}) => {
  const lang = useSelector((state) => state?.translation?.payload)

  const {
    data: types,
    isLoading,
    isFetching,
  } = useGetDeductibleTypesQuery({
    page: 0,
    size: 10,
    search:"",
    type:"",
    enumaration:"",
  })

  const handleTypeChange = (value) => {
    setTypeId(value)
  }


  const typesList = types?.payload?.items?.length
    ? [
        ...types?.payload?.items?.map((item) => ({
          key: item?.id,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  // useEffect(() => {
  //   if (itemToEdit) {
  //     form.setFieldsValue({
  //       ...itemToEdit,
  //       classroomIDs: itemToEdit?.classroomIDs || [itemToEdit?.classroomId],
  //     })
  //   }
  // }, [form, itemToEdit])

  const options = [
    { key: 'null', value: '', label: 'Select Type' },
    { key: 'Rama', value: 'RAMA', label: 'Rama' },
    { key: 'Pension', value: 'PENSION', label: 'Pension' },
  ]

  return (
    <Form form={form} name='add-deductible' onFinish={onFinish}>
      <Row>
      <Col className='w-[100%]'>
        <CustomInput
            onChange={handleTypeChange}
            value={typeId}
            type='select'
            label={"Type"}
            options={[
              {
                key: 0,
                value: '',
                label: "Select type",
              },
              ...typesList,
            ]}
            isLoading={isFetching}
          />
      </Col>
      </Row>
      <label className='mb-2'>Deductible types</label>
      {/* <Form.List name={'types'}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row
                gutter={24}
                key={key}
                style={{ display: 'flex', marginBottom: 2,marginTop:5 }}
                align='baseline'
              >
                <Col span={isScreenSmall ? 24 : 12}>
                  <Form.Item
                    name={[name, 'type']}
                    rules={[{ required: true, message: 'Missing Type' }]}
                    {...restField}
                  >
                    <Select
                      className='rounded h-[40px] border border-gray-300 flex items-center'
                      options={options}
                    >
                      {options.map((option) => (
                        <Option key={option?.index} value={option?.value}>
                          {option?.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={isScreenSmall ? 24 : 12}>
                  <Form.Item
                    name={[name, 'amount']}
                    rules={[{ required: true, message: 'Missing amount' }]}
                    {...restField}
                  >
                    <Input
                      placeholder={'amount'}
                      className={`rounded h-[40px]`}
                      type='number'
                    />
                  </Form.Item>
                </Col>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Row>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                className='mt-3'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Type
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List> */}
    </Form>
  )
}

export default NewDeductibleForm
