import React from "react";
import { StyledMenuWrap } from "../styles/styles";

const Menu = ({ Component, name, size, duration, distance, color, easing }) => {
  const content = (
    <Component
      size={size}
      duration={duration}
      distance={distance}
      color={color}
      easing={easing}
    />
  );

  return (
    <StyledMenuWrap containerSize="150px" containerHeight="150px">
      {content}
      <div style={{ marginTop: "10px" }}>{name}</div>
    </StyledMenuWrap>
  );
};

export default Menu;
