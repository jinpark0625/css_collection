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

const HamburgerMenu = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Divide toggled={isOpen} toggle={setOpen} />
      <Cross toggled={isOpen} toggle={setOpen} />
      <Squash toggled={isOpen} toggle={setOpen} />
      <Fade toggled={isOpen} toggle={setOpen} />
      <Pivot toggled={isOpen} toggle={setOpen} />
      <Rotate toggled={isOpen} toggle={setOpen} />
      <Slant toggled={isOpen} toggle={setOpen} />
      <Sling toggled={isOpen} toggle={setOpen} />
      <Spin toggled={isOpen} toggle={setOpen} />
      <Spiral toggled={isOpen} toggle={setOpen} />
      <Squeeze toggled={isOpen} toggle={setOpen} />
      <Turn toggled={isOpen} toggle={setOpen} />
    </>
  );
};

export default HamburgerMenu;
