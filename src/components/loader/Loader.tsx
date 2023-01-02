import styled from 'styled-components';
import View from '../view/View';

interface ILoader {
  position?: 'relative' | 'absolute' | 'fixed';
}

const StyledView = styled(View)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  backdrop-filter: blur(1px);
`;
const Loader = ({ position = 'absolute' }: ILoader) => {
  return (
    <StyledView position={position}>
      <View className="loader loader-animation-1"></View>
      <View className="loader loader-animation-2"></View>
      <View className="loader loader-animation-3"></View>
      <View className="loader loader-animation-4"></View>
      <View className="loader loader-animation-5"></View>
      <View className="loader loader-animation-6"></View>
      <View className="loader loader-animation-7"></View>
      <View className="loader loader-animation-8"></View>
    </StyledView>
  );
};

export default Loader;
