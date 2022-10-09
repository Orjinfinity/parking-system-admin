import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  onFocus?: () => void;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string;
  control: Control<any>;
}

const TextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  placeholder = '',
  name,
  control,
  rules,
  defaultValue,
}: InputProps<TFieldValues, TName>) => {
  const { field } = useController({ name, control, rules });

  return (
    <TextFieldRef
      id={name}
      {...field}
      placeholder={placeholder}
      defaultValue={defaultValue}
      autoComplete="off"
    />
  );
};

const TextFieldRef = styled("input")<SpaceProps>`
  outline: 0;
  padding: 6px 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid rgba(58, 53, 65, 0.23);
  border-radius: 6px;
  ${space}
`;

export default TextField;
