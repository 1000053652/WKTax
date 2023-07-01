import React from 'react'
import Input from '../Input'
import { useController } from 'react-hook-form'

const ControlledInput = ({
  control,
  defaultValue = '',
  editable = true,
  name,
  rules,
  ...props
}) => {
  const { field, formState } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return (
    <Input
      editable={editable}
      error={formState?.errors[name]?.message}
      onBlur={field.onBlur}
      onChangeText={field.onChange}
      value={field.value}
      {...props}
    />
  )
}

export default ControlledInput
