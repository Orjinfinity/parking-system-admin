import styled from "styled-components";
import { BuildingMultiple } from "@styled-icons/fluentui-system-filled/BuildingMultiple";
import { color, space } from "styled-system";
import { IconProps } from "../../interfaces";

const BuildingIcon = styled(BuildingMultiple)<IconProps>`
    ${space}
    ${color}
`
export default BuildingIcon;