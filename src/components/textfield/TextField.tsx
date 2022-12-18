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
  type?: 'text' | 'email' | 'password';
  onFocus?: () => void;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string;
  control: Control<any>;
}

interface BasicInputProps {
  name: string;
  type?: 'text' | 'email' | 'password';
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface StyledProps extends SpaceProps {
  error: boolean;
}

export const BasicTextField = ({
  name,
  type,
  defaultValue,
  placeholder,
  onChange
}: BasicInputProps) => {
  return (
    <TextFieldRef
      id={name}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      autoComplete="off"
      error={false}
    />
  );
};

const TextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  placeholder = '',
  name,
  control,
  rules,
  type = 'text',
  defaultValue,
}: InputProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <TextFieldRef
      id={name}
      {...field}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      autoComplete="off"
      error={!!fieldState.error?.message}
    />
  );
};

const TextFieldRef = styled('input')<StyledProps>`
  outline: 0;
  padding: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid
    ${({ error, theme }) =>
      error ? `${theme.colors.error}` : 'rgba(58, 53, 65, 0.23)'};
  border-radius: 6px;

  ::placeholder,
  ::-webkit-input-placeholder {
    letter-spacing: 0.15px;
    font-weigth: ${({ theme }) => theme.fontWeights.regular};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ error, theme }) =>
      error ? `${theme.colors.error}` : 'rgba(58, 53, 65, 0.38)'};
  }
  :-ms-input-placeholder {
    letter-spacing: 0.15px;
    font-weigth: ${({ theme }) => theme.fontWeights.regular};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ error, theme }) =>
      error ? `${theme.colors.error}` : 'rgba(58, 53, 65, 0.38)'};
  }
  ${space}
`;

export default TextField;
