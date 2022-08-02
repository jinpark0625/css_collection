import { HamburgerMenu } from "../components";

export default {
  title: "Components/HamburgerMenu",
  component: HamburgerMenu,
};

const Template = ({ ...args }) => <HamburgerMenu {...args} />;

export const Menus = Template.bind({});
Menus.args = {
  size: "24",
  duration: "0.6",
  distance: "md",
  color: "#1d1d1f",
  easing: "ease-in",
};
