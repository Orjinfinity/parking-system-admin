import styled from "styled-components";
import { Logout } from "@styled-icons/material/Logout";
import { color, space } from "styled-system";
import { IconProps } from "../../interfaces";

const LogoutIcon = styled(Logout)<IconProps>`
    ${space}
    ${color}
`
export default LogoutIcon;