import {
  useForm,
  UseFormProps,
  RegisterOptions,
  FieldValues,
  ChangeHandler,
  Path,
} from 'react-hook-form';

export interface UseCustomFormProps<FormValues extends FieldValues = FieldValues>
  extends UseFormProps<FormValues> {
  trim?: boolean;
}

export const useCustomForm = <FormValues extends FieldValues>({
  trim,
  ...props
}: UseCustomFormProps<FormValues>) => {
  const methods = useForm<FormValues>(props);

  const customRegister = (name: Path<FormValues>, registerOptions?: RegisterOptions) => {
    const field = methods.register(name, registerOptions);

    const customOnChange: ChangeHandler = async (event) => {
      const { target } = event;

      if (trim && typeof target.value === 'string' && target.value) {
        target.value = target.value.trim();
      }

      field.onChange(event);
    };

    return { ...field, onChange: customOnChange };
  };

  return { ...methods, register: customRegister };
};
