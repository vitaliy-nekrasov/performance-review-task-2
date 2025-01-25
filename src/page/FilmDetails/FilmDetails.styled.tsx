import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const Wrapper = styled.div`
  width: 1550px;
  margin: 10px auto 0;
`;

export const BackLink = styled(Link)`
  display: flex;
  gap: 4px;
  width: 120px;
  height: 40px;
  background-color: #6b7280;
  color: white;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  text-decoration: none;

  &:hover {
    background-color: #4b5563;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 42px;
  margin-top: 10px;
`;

export const PosterImage = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
`;

export const UserScore = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const Section = styled.div`
  span {
    font-size: 1.5rem;
    font-weight: 500;
  }

  p {
    font-size: 1.25rem;
    font-weight: 400;
  }
`;

export const StyledButton = styled(Button)`
  width: ${({ fullWidth }) => (fullWidth ? "220px" : "170px")};
`;
