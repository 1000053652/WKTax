import { NumberFieldType } from './types'

export const normalizeText = (val?: string) =>
  val && val.replace(/[^a-zA-Z0-9\-,.'"&~!@#$%^*()[]\/\\_+= ]/g, '')

export const filterNumbers = (val: string) => {
  if (!val) {
    return val
  }
  if (typeof val === 'string') {
    return val.replace(/\D/g, '')
  }
  if (typeof val === 'number') {
    return val
  }
  return val
}

export const formatPhone = (val: string) => {
  if (!val) {
    return val
  }
  if (val.charAt(0) === '1' || val.charAt(0) === '0') {
    return val.slice(1)
  }
  const onlyNums = filterNumbers(val)
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
    6,
    10
  )}`
}

export const usPhoneNumberValidator = (val: string) => {
  if (val) {
    return val.match(
      '^(((?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:\\(\\s*([2-9]\\d{2})\\s*\\)|([2-9]\\d{2}))\\s*(?:[.-]\\s*)?)(\\d{3})\\s*(?:[.-]\\s*)?(\\d{4}))|((?:\\+([2-9]\\d{0,2})\\s*(?:(\\.|-|\\s)\\s*))(\\d{7,12})))(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(\\d+))?$'
    )
      ? undefined
      : 'Must be a valid US Phone number'
  }
  return ''
}

export const required = (val?: string) =>
  val ? val.trim().length > 0 : !!val || val === '0'
export const zipCodeLength = (min: number, val?: string) =>
  !val || (val && val.length === min)

export const formatCurrency = (
  inputValue: string,
  excludeZeroValue?: boolean
) => {
  if (!inputValue) return ''
  const currencyValue = inputValue
  const integerValue = parseInt(currencyValue)
  if (excludeZeroValue && integerValue === 0) {
    return ''
  }
  const valueWithCommas = `${integerValue}`
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `$${valueWithCommas}`
}

export function patternFormat(pattern: string) {
  // convert pattern into block sections: 'xxx xxxx xxxx' => [3, ' ', 4, ' ', 4]
  const sections = []
  let i = 0
  let prevPlaceholder = undefined
  for (const c of pattern) {
    const placeholder = /[a-zA-Z0-9]/.test(c)
    // init previous placeholder state by first character
    if (prevPlaceholder === undefined) {
      prevPlaceholder = placeholder
    }

    if (placeholder !== prevPlaceholder) {
      prevPlaceholder = placeholder
      i++
    }

    if (placeholder) {
      // placeholder
      if (i === sections.length) sections[i] = 1
      else sections[i]++
    } else {
      // separator
      if (i === sections.length) sections[i] = c
      else sections[i] += c
    }
  }

  return function format(str) {
    let result = ''
    let i = 0
    for (const section of sections) {
      // end if all characters in "str" are consumed
      if (i >= str.length) break

      if (typeof section === 'number') {
        result += str.substring(i, i + section)
        i += section
      } else {
        result += section
      }
    }
    // concat rest characters.
    if (i < str.length) {
      result += str.substring(i)
    }
    return result
  }
}
export const checkMaxLenghtForNumberField = (
  fieldType?: NumberFieldType,
  max?: number
) => {
  switch (fieldType) {
    case 'currency':
      return max ? max : 14
    case 'days' && 'percentage':
      return max ? max : 3
    case 'pattern':
      return max ? max : 10
    default:
      return max
  }
}
export const removeDollarAndComma = (value: string) => {
  if (value) {
    return value.replace(/[$,]/g, '')
  }
  return ''
}
export const formateAmount = (
  inputValue: string,
  fieldType: NumberFieldType,
  maxValue?: number,
  pattern?: string
) => {
  const formattedValue = inputValue.replace(/[^\d]/g, '')
  switch (fieldType) {
    case 'currency':
      const numericValue = formattedValue.replace(/[$,]/g, '')
      return formatCurrency(numericValue, true)
    case 'days':
      const sanitized = formattedValue.replace(/^0+/, '')
      if (sanitized && parseInt(sanitized) <= (maxValue ? maxValue : 365)) {
        return sanitized
      } else {
        return ''
      }
    case 'percentage':
      const sanitizedPer = formattedValue.replace(/^0+/, '')
      if (
        sanitizedPer &&
        parseInt(sanitizedPer) <= (maxValue ? maxValue : 100)
      ) {
        return sanitizedPer
      } else {
        return ''
      }
    case 'pattern':
      const sanitizedPattern = formattedValue.replace(/^0+/, '')
      if (sanitizedPattern && pattern) {
        return patternFormat(pattern)(sanitizedPattern)
      } else {
        return ''
      }
    default:
      return inputValue
  }
}
