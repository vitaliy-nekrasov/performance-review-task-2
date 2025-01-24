import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
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
  gap: 4px;
  width: 120px;
  height: 40px;
  background-color: #6b7280;
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;

  &:hover {
    background-color: #4b5563;
  }
`;
