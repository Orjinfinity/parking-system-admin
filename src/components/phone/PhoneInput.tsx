import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

interface PhoneProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string;
  control: Control<any>;
}

const PhoneInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  rules,
  control,
  placeholder = '',
}: PhoneProps<TFieldValues, TName>) => {
  const { field } = useController({ name, rules, control });

  return (
    <PatternFormat
      placeholder={placeholder}
      format="+90 (###) #### ###"
      allowEmptyFormatting
      mask="_"
      type="tel"
      {...field}
      getInputRef={field.ref}
    />
  );
};

export default PhoneInput;
