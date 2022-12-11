import styled from "styled-components";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { color, space } from "styled-system";
import { IconProps } from "../../interfaces";

const CloseIcon = styled(CloseOutline)<IconProps>`
    ${space}
    ${color}
`
export default CloseIcon;