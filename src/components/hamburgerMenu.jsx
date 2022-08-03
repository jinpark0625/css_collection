import React from "react";
import PropTypes from "prop-types";
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

const HamburgerMenu = ({
  size = "24",
  duration = "0.4",
  distance = "md",
  color = "#1d1d1f",
  easing = "ease-in",
}) => {
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
          return (
            <Menu
              key={index}
              Component={item.component}
              name={item.name}
              size={size}
              duration={duration}
              distance={distance}
              color={color}
              easing={easing}
            />
          );
        })}
      </StyledMenu>
    </StyledMenuContainer>
  );
};

HamburgerMenu.propTypes = {
  size: PropTypes.oneOf(["24", "32", "48"]),
  duration: PropTypes.string,
  distance: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.string,
  easing: PropTypes.string,
};

export default HamburgerMenu;
