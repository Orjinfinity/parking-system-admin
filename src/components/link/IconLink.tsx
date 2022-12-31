import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import {
  border,
  color,
  flexbox,
  layout,
  position,
  space,
  typography,
} from 'styled-system';

interface IconLinkProps {
  children: ReactNode;
  icon?: StyledIcon;
  to: string;
}

const IconLink = ({ icon: Icon, to, children }: IconLinkProps) => {
  return (
    <StyledIconLink
      to={to}
      className={({ isActive }) => (isActive ? 'active' : undefined)}
    >
      {!!Icon && <Icon />}
      {children}
    </StyledIconLink>
  );
};

const StyledIconLink = styled(NavLink)`
  letter-spacing: 0.15px;
  line-height: 20px;
  border-radius: 5px;
  ${color}
  ${space}
${position}
${border}
${typography}
${flexbox}
${layout}
`;

export default IconLink;
