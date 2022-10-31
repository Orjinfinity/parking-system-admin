import styled from "styled-components";
import { Notifications } from "@styled-icons/material-outlined/Notifications";
import { space } from "styled-system";
import { IconProps } from "../../interfaces";

const NotificationIcon = styled(Notifications)<IconProps>`
    ${space}
`
export default NotificationIcon;