import React from 'react';
import styled from 'styled-components';
import ReactSelect, { GroupBase, OptionsOrGroups } from 'react-select';
import AsyncSelect from 'react-select/async';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';
import { space, SpaceProps } from 'styled-system';
import { ISelectOption } from '../../interfaces';

interface SelectProps<
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
  isAsyncSelect?: boolean;
  isLoading?: boolean;
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsOrGroups<unknown, GroupBase<unknown>>) => void
  ) => void;
  options?: ISelectOption[];
  control: Control<any>;
}

const Select = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  rules,
  defaultValue,
  placeholder = '',
  isAsyncSelect = false,
  loadOptions,
  options = [],
  isLoading = false,
  control,
}: SelectProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({ name, control, rules });

  if (isAsyncSelect) {
    return (
      <AsyncSelectStyled
        id={name}
        {...field}
        cacheOptions
        loadOptions={loadOptions}
        defaultValue={defaultValue}
        placeholder={placeholder}
        styles={{
          control: (styles) => ({
            ...styles,
            borderColor: !fieldState.error
              ? 'rgba(58, 53, 65, 0.38)'
              : '#FF4C51',
          }),
          placeholder: (styles) => ({
            ...styles,
            letterSpacing: '0.15px',
            fontWeight: '400',
            fontSize: '16px',
            color: !fieldState.error ? 'rgba(58, 53, 65, 0.38)' : '#FF4C51',
          }),
          input: (styles) => ({
            ...styles,
            outline: 0,
            padding: '12px',
            fontSize: '16px',
            borderRadius: '6px',
          }),
        }}
      />
    );
  }

  return (
    <SelectStyled
      id={name}
      {...field}
      options={options}
      defaultValue={defaultValue}
      isLoading={isLoading}
      placeholder={placeholder}
      styles={{
        control: (styles) => ({
          ...styles,
          borderColor: !fieldState.error ? 'rgba(58, 53, 65, 0.38)' : '#FF4C51',
        }),
        placeholder: (styles) => ({
          ...styles,
          letterSpacing: '0.15px',
          fontWeight: '400',
          fontSize: '16px',
          color: !fieldState.error ? 'rgba(58, 53, 65, 0.38)' : '#FF4C51',
        }),
        input: (styles) => ({
          ...styles,
          outline: 0,
          padding: '12px',
          fontSize: '16px',
          borderRadius: '6px',
        }),
      }}
    />
  );
};

const SelectStyled = styled(ReactSelect)<SpaceProps>`
  ${space}
`;
const AsyncSelectStyled = styled(AsyncSelect)<SpaceProps>`
  ${space}
`;

export default Select;
