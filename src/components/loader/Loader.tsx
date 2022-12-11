import styled from 'styled-components'
import View from '../view/View'

interface ILoader { position?: "relative" | "absolute" }

const StyledView = styled(View)`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Loader = ({ position = "absolute" }: ILoader) => {
  return (
    <StyledView position={position}>
        <View className='loader loader-animation-1'></View>
        <View className='loader loader-animation-2'></View>
        <View className='loader loader-animation-3'></View>
        <View className='loader loader-animation-4'></View>
        <View className='loader loader-animation-5'></View>
        <View className='loader loader-animation-6'></View>
        <View className='loader loader-animation-7'></View>
        <View className='loader loader-animation-8'></View>
    </StyledView>
  )
}

export default Loader