import styled from "styled-components";
import { ContentCopy } from "@styled-icons/material/ContentCopy";
import { color, space } from "styled-system";
import { IconProps } from "../../interfaces";

const CopyIcon = styled(ContentCopy)<IconProps>`
    ${space}
    ${color}
`
export default CopyIcon;