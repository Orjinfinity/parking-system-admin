import styled from "styled-components";
import { CarSport } from "@styled-icons/ionicons-sharp/CarSport";
import { color, space } from "styled-system";
import { IconProps } from "../../interfaces";

const CarIcon = styled(CarSport)<IconProps>`
    ${space}
    ${color}
`
export default CarIcon;