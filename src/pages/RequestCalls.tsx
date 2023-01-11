import { Title, View, Text, RequestCall } from '../components';
import { RequestCallContextProvider } from '../contexts';

const RequestCalls = () => {
  return (
    <View>
      <Title
        mb="6px"
        color="textColor"
        fontSize={['1rem', '1rem', '1.2rem', '1.5rem']}
      >
        Acil Durum Çağrıları
      </Title>
      <Text
        fontSize="small"
        color="textSecondaryColor"
        mb={['12px', '16px', '16px', '24px']}
      >
        Find all of your company’s administrator accounts and their associate
        roles.
      </Text>
      <RequestCallContextProvider>
        <RequestCall />
      </RequestCallContextProvider>
    </View>
  );
};

export default RequestCalls;
