import DatePicker from 'antd/lib/date-picker'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import PropTypes from 'prop-types'
import React from 'react'

const { Option } = Select

const CustomInput = ({
  label = '',
  placeholder,
  type = 'normal',
  inputType,
  value,
  width,
  defaultValue,
  options = [],
  name,
  isLoading,
  disabled,
  allowClear = false,
  showSearch = false,
  rules,
  styles,
  onChange = () => null,
}) => {
  const NormalInput = (
    <div className='mb-[-10px]'>
      {label && (
        <label className='text-[18px] text-black font-[500] mb-2 block'>
          {label}
        </label>
      )}

      <Form.Item name={name} rules={rules}>
        <Input
          value={value}
          type={inputType}
          placeholder={placeholder || 'Type'}
          className={`rounded h-[40px] ${styles}`}
          disabled={(type == 'file' && isLoading) || disabled}
          onChange={({ target }) =>
            onChange(type === 'file' ? target?.files : target?.value)
          }
        />
      </Form.Item>
    </div>
  )

  const TextArea = (
    <div className='mb-[-10px]'>
      {label && (
        <label className='text-[18px] text-black font-[500] mb-2 block'>
          {label}
        </label>
      )}

      <Form.Item name={name} rules={rules}>
        <Input.TextArea
          value={value}
          type={inputType}
          rows={5}
          placeholder={placeholder || 'Type'}
          className={`rounded  ${styles}`}
          disabled={(type == 'file' && isLoading) || disabled}
          onChange={({ target }) =>
            onChange(type === 'file' ? target?.files : target?.value)
          }
        />
      </Form.Item>
    </div>
  )

  const SelectInput = (
    <div className='mb-[-10px]'>
      {label && (
        <label className='text-[18px] text-black font-[500] mb-2 block'>
          {label}
        </label>
      )}

      <Form.Item name={name} rules={rules}>
        <Select
          value={value}
          onChange={(value) => onChange(value)}
          className='rounded h-[40px] border border-gray-300 flex items-center'
          loading={isLoading}
          allowClear={allowClear}
          showSearch={showSearch}
          disabled={disabled}
          options={options}
          defaultValue={defaultValue}
          name={name}
        >
          {options.map((option) => (
            <Option key={option?.index} value={option?.value}>
              {option?.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  )

  const SelectMultipleInput = (
    <div className='mb-[-10px]'>
      {label && (
        <label className='text-[18px] text-black font-[500] mb-2 block'>
          {label}
        </label>
      )}

      <Form.Item name={name} rules={rules}>
        <Select
          className='border border-gray-300 rounded'
          mode='multiple'
          size='large'
          loading={isLoading}
          disabled={disabled}
          placeholder='Please select'
          defaultValue={defaultValue}
          onChange={(e) =>
            onChange(e)
          }
          style={{
            width: '100%',
          }}
          options={options}
        />
      </Form.Item>
    </div>
  )

  const SmallSelectInput = (
    <div className='h-[46px] border p-3 border-gray rounded flex items-center gap-2'>
      <label className='text-[12px] text-black'>{label}:</label>

      <Form.Item name={name} rules={rules}>
        <Select
          value={value}
          onChange={(value) => onChange(value)}
          loading={isLoading}
          disabled={disabled}
          className={`border-none mt-5 ${
            width ? `w-[${width}]` : 'w-[100px]'
          } rounded`}
          style={{ minWidth: '60px' }}
          options={options}
          name={name}
        >
          {options.map((option) => (
            <Option key={option?.index} value={option?.value}>
              {option?.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  )

  const CustomDatePicker = (
    <div className='mb-[-10px] w-[100%]'>
      {label && (
        <label className='text-[18px] text-black font-[500] mb-2 block'>
          {label}
        </label>
      )}

      <Form.Item name={name} rules={rules}>
        <DatePicker
          value={value}
          type={inputType}
          disabled={disabled}
          placeholder={placeholder || 'Type'}
          className='rounded h-[40px] w-[100%]'
        />
      </Form.Item>
    </div>
  )

  switch (type) {
    case 'small-select':
      return SmallSelectInput
      break

    case 'select':
      return SelectInput
      break

    case 'select-multiple':
      return SelectMultipleInput
      break

    case 'date':
      return CustomDatePicker
      break
    case 'text-area':
      return TextArea
      break
    default:
      return NormalInput
      break
  }
}

CustomInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  showSearch: PropTypes.bool,
  allowClear: PropTypes.bool,
}

export default CustomInput
