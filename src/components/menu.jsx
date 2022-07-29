import React from "react";
import { StyledMenuContainer, StyledMenuWrap } from "../styles/styles";

const Menu = ({ Component }) => {
  const content = <Component />;

  return (
    <StyledMenuContainer containerSize="150px" containerHeight="150px">
      <StyledMenuWrap>{content}</StyledMenuWrap>
    </StyledMenuContainer>
  );
};

export default Menu;
