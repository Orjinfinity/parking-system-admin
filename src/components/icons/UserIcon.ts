import styled from "styled-components";
import { User } from "@styled-icons/boxicons-regular/User"
import { color, space } from "styled-system";
import { IconProps } from "../../interfaces";

const UserIcon = styled(User)<IconProps>`
    ${space}
    ${color}
`
export default UserIcon;