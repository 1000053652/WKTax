import { FormProvider, useForm } from 'react-hook-form'

function withReactHookForm(WrappedComponent, restProps) {
  const HOC = () => {
    const methods = useForm()

    return (
      <FormProvider {...methods}>
        <WrappedComponent {...restProps} />
      </FormProvider>
    )
  }

  return HOC
}

export { withReactHookForm }
