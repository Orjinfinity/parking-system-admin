import { ReactNode } from 'react';
import Text from './Text';

interface IErrorMessage {
  children: ReactNode;
}

const ErrorMessage = ({ children }: IErrorMessage) => {
  return (
    <Text size="sm" mt="4px" color="lightError">
      {children}
    </Text>
  );
};

export default ErrorMessage;
