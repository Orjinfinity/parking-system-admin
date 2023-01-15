import { Title, View, Text, GateProces } from '../components';
import { GateProcesContextProvider } from '../contexts';

const GateProcesses = () => {
  return (
    <View>
    <Title
      mb="6px"
      color="textColor"
      fontSize={['1rem', '1rem', '1.2rem', '1.5rem']}
    >
      Giriş Çıkış İşlemleri
    </Title>
    <Text
      fontSize="small"
      color="textSecondaryColor"
      mb={['12px', '16px', '16px', '24px']}
    >
      Find all of your company’s administrator accounts and their associate
      roles.
    </Text>
    <GateProcesContextProvider>
      <GateProces />
    </GateProcesContextProvider>
  </View>
  )
}

export default GateProcesses