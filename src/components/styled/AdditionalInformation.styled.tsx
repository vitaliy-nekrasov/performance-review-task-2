import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.div`
  padding-top: ${(p) => p.theme.space[4]};
  padding-bottom: ${(p) => p.theme.space[4]};
`;

export const Title = styled.h2`
  margin-bottom: ${(p) => p.theme.space[6]};
  font-size: 2.5rem;
  font-weight: bold;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space[2]};
  width: 120px;
  height: 40px;
  background-color: ${(p) => p.theme.colors.grey};
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: ${(p) => p.theme.space[3]};

  &:hover {
    background-color: ${(p) => p.theme.colors.greySecondary};
  }

  &.active {
    background: ${(p) => p.theme.colors.greySecondary};
  }
`;
