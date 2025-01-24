import GroupIcon from "@mui/icons-material/Group";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  Wrapper,
  Title,
  ButtonsWrapper,
  StyledNavLink,
} from "./styled/AdditionalInformation.styled";

interface AdditionalInformationProps {
  link: string;
}

export function AdditionalInformation({ link }: AdditionalInformationProps) {
  return (
    <Wrapper>
      <Title>Additional information</Title>
      <ButtonsWrapper>
        <StyledNavLink
          to="cast"
          state={{ from: link }}
        >
          <GroupIcon />
          Cast
        </StyledNavLink>
        <StyledNavLink
          to="reviews"
          state={{ from: link }}
        >
          <FormatListBulletedIcon />
          Reviews
        </StyledNavLink>
      </ButtonsWrapper>
    </Wrapper>
  );
}
