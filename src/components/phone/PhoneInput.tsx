import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { SpaceProps } from 'styled-system';
import styled from 'styled-components';
import React from 'react';

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

interface StyledProps extends SpaceProps {
  error: string;
}

const StyledPhoneInput = styled(PatternFormat)<StyledProps>`
  outline: 0;
  padding: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid
    ${({ error, theme }) =>
      error ? `${theme.colors.error}` : 'rgba(58, 53, 65, 0.23)'};
  color: ${({ error, theme }) => (error ? `${theme.colors.error}` : 'initial')};
  border-radius: 6px;
`;

const PhoneInput = React.forwardRef<
  HTMLInputElement,
  PhoneProps<FieldValues, FieldPath<FieldValues>>
>(
  (
    {
      name,
      rules,
      control,
      placeholder = '',
    }: PhoneProps<FieldValues, FieldPath<FieldValues>>,
    funcRef
  ) => {
    const {
      field: { ref, ...otherFields },
      fieldState,
    } = useController({ name, rules, control });
    return (
      <StyledPhoneInput
        placeholder={placeholder}
        format="+90 (###) ### ####"
        allowEmptyFormatting
        mask="_"
        type="tel"
        {...otherFields}
        error={fieldState.error?.message?.toString() || ''}
        getInputRef={funcRef}
      />
    );
  }
);

export default PhoneInput;
