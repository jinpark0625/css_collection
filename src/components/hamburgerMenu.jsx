import React, { useState } from "react";
import {
  Squash,
  Cross,
  Divide,
  Fade,
  Pivot,
  Rotate,
  Slant,
  Sling,
  Spin,
  Spiral,
  Squeeze,
  Turn,
} from "hamburger-react";
import Menu from "./menu";
import { StyledMenuContainer, StyledTitle, StyledMenu } from "../styles/styles";

const HamburgerMenu = () => {
  // const [isOpen, setOpen] = useState(false);

  const menus = [
    {
      name: "Squash",
      component: Squash,
    },
    {
      name: "Cross",
      component: Cross,
    },
    {
      name: "Divide",
      component: Divide,
    },
    {
      name: "Fade",
      component: Fade,
    },
    {
      name: "Pivot",
      component: Pivot,
    },
    {
      name: "Rotate",
      component: Rotate,
    },
    {
      name: "Slant",
      component: Slant,
    },
    {
      name: "Sling",
      component: Sling,
    },
    {
      name: "Spin",
      component: Spin,
    },
    {
      name: "Spiral",
      component: Spiral,
    },
    {
      name: "Squeeze",
      component: Squeeze,
    },
    {
      name: "Turn",
      component: Turn,
    },
  ];

  return (
    <StyledMenuContainer>
      <StyledTitle>Hamburger Icon Animations</StyledTitle>
      <StyledMenu>
        {menus.map((item, index) => {
          return <Menu key={index} Component={item.component} />;
        })}
      </StyledMenu>
    </StyledMenuContainer>
  );
};

export default HamburgerMenu;
