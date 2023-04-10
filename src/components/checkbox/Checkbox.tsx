import { ChangeEvent } from 'react';
import { View, Text } from '..';

interface ICheckbox {
  label: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const Checkbox = ({ label, handleChange, checked }: ICheckbox) => {
  return (
    <View>
      <label style={{display:"flex"}}>
        <input type="checkbox" onChange={handleChange} checked={checked} />
        <Text ml="8px">{label}</Text>
      </label>
    </View>
  );
};

export default Checkbox;
