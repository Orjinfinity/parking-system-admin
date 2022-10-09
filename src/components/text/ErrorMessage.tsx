import { ReactNode } from 'react';
import Text from './Text';

interface IErrorMessage {
  children: ReactNode;
}

const ErrorMessage = ({ children }: IErrorMessage) => {
  return (
    <Text size="sm" mt="3px" color="red">
      {children}
    </Text>
  );
};

export default ErrorMessage;
