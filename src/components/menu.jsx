import React, { useState } from "react";
import { StyledMenuWrap } from "../styles/styles";

const Menu = ({ Component }) => {
  const content = <Component color="#fff" />;

  return (
    <StyledMenuWrap containerSize="150px" containerHeight="150px">
      {content}
    </StyledMenuWrap>
  );
};

export default Menu;
