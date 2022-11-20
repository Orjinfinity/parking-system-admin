import styled from "styled-components";
import { Question } from "@styled-icons/remix-line/Question";
import { color, space } from "styled-system";
import { IconProps } from "../../interfaces";

const QuestionIcon = styled(Question)<IconProps>`
    ${space}
    ${color}
`
export default QuestionIcon;