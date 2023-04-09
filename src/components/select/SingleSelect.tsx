import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import ReactSelect from 'react-select';
import { ISelectOption } from '../../interfaces';

const SelectStyled = styled(ReactSelect)<SpaceProps>`
  ${space}
`;

interface ISingleSelect {
  id: string;
  options: ISelectOption[];
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  value?: any;
  onChange: (newValue: ISelectOption) => void
}

const SingleSelect = ({
  id,
  options = [],
  defaultValue,
  placeholder = '',
  isLoading = false,
  isDisabled = false,
  width= '',
  height = '',
  padding = '',
  value,
  onChange
}: ISingleSelect) => {
  return (
    <SelectStyled
      id={id}
      options={options}
      defaultValue={defaultValue}
      isLoading={isLoading}
      placeholder={placeholder}
      isDisabled={isDisabled}
      value={value}
      onChange={onChange}
      styles={{
        control: (styles) => ({
          ...styles,
          borderColor: 'rgba(58, 53, 65, 0.38)',
        }),
        placeholder: (styles) => ({
          ...styles,
          letterSpacing: '0.15px',
          fontWeight: '400',
          fontSize: '16px',
          color: 'rgba(58, 53, 65, 0.38)',
        }),
        input: (styles) => ({
          ...styles,
          outline: 0,
          ...(width && {width}),
          ...(height && {height}),
          ...(padding && {padding}),
          fontSize: '16px',
          borderRadius: '6px',
        }),
      }}
    />
  );
};

export default SingleSelect;
